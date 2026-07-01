import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Lead } from "../models/Lead.js";
import {
  createLeadSchema,
  leadSchema,
  objectId,
  updateLeadSchema,
} from "../validations/lead.validation.js";

export const getLeads = asyncHandler(async (req, res) => {
  const result = leadSchema.safeParse(req.query);

  if (!result.success) {
    throw new ApiError(400, result.error.issues[0].message);
  }

  const filter = { owner: req.user._id };
  if (result.data.status) filter.status = result.data.status;
  if (result.data.priority) filter.priority = result.data.priority;
  if (result.data.source) filter.source = result.data.source;
  if (result.data.search) {
    const rx = new RegExp(result.data.search, "i");
    filter.$or = [{ name: rx }, { email: rx }, { company: rx }];
  }

  const leads = await Lead.find(filter).sort({ order: 1, createdAt: -1 });
  res.json({ success: true, count: leads.length, leads });
});

export const getLead = asyncHandler(async (req, res) => {
  const validatedId = objectId.safeParse(req.params.id);
  if (!validatedId.success) {
    throw new ApiError(400, validatedId.error.issues[0].message);
  }
  const id = validatedId;

  const lead = await Lead.findOne({ _id: id, owner: req.user._id });
  if (!lead) throw new ApiError(404, "Lead not found");
  res.json({ success: true, lead });
});

export const createLead = asyncHandler(async (req, res) => {
  const validatedData = createLeadSchema.parse(req.body);

  const lead = await Lead.create({ ...validatedData, owner: req.user._id });
  res.status(201).json({ success: true, lead });
});

export const updateLead = asyncHandler(async (req, res) => {
  const validatedData = updateLeadSchema.parse(req.body);
  const validatedId = objectId.parse(req.params.id);

  const id = validatedId;

  const lead = await Lead.findOneAndUpdate(
    { _id: id, owner: req.user._id },
    validatedData,
    { new: true, runValidators: true },
  );

  if (!lead) throw new ApiError(404, "Lead not found");
  res.json({
    success: true,
    lead,
  });
});

export const deleteLead = asyncHandler(async (req, res) => {
  const id = objectId.parse(req.params.id);
  const lead = await Lead.findOneAndDelete({ _id: id, owner: req.user._id });
  if (!lead) throw new ApiError(404, "Lead not found");
  res.json({ success: true, message: "Lead deleted" });
});

export const reorderLeads = asyncHandler(async (req, res) => {
  const { updates } = req.body;
  if (!Array.isArray(updates)) {
    throw new ApiError(400, "Updates must be an array");
  }

  await Promise.all(
    updates.map((u) => {
     return Lead.updateOne(
        { _id: u.id, owner: req.user._id },
        { $set: { status: u.status, order: u.order } },
      );
    }),
  );

  res.json({success:true, message:"Pipeline updated"})
});
