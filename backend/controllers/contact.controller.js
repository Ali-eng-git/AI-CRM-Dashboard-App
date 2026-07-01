import { Contact } from "../models/Contact.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { objectId } from "../validations/lead.validation.js";
import { createContactSchema, updateContactSchema } from "../validations/contact.validation.js";


export const getContacts = asyncHandler(async (req, res) => {
  const { search, tag } = req.query;
  const filter = { owner: req.user._id };

  if (tag) filter.tags = tag;
  if (search) {
    const rx = new RegExp(search, "i");
    filter.$or = [{ name: rx }, { email: rx }, { company: rx }];
  }
  const contacts = await Contact.find(filter).sort({ favorite: -1, name: 1 });
  res.json({ success: true, count: contacts.length, contacts });
});

export const getContact = asyncHandler(async (req, res) => {
  const id = objectId.parse(req.params.id);

  const contact = await Contact.findOne({ _id: id, owner: req.user._id });
  if (!contact) throw new ApiError(404, "Contact not found");
  res.json({ success: true, contact });
});

export const createContact = asyncHandler(async(req,res)=>{
    const validatedData = createContactSchema.parse(req.body)
    const contact  = await Contact.create({...validatedData, owner:req.user._id})
    res.status(201).json({success:true, contact})
})

export const updateContact = asyncHandler(async(req,res)=>{
    const validateData = updateContactSchema.parse(req.body)
    const id = objectId.parse(req.params.id)

    const contact = await Contact.findOneAndUpdate(
        {_id:id,owner:req.user._id},
        validateData,
        {new:true, runValidators:true}
    )
    if(!contact) throw new ApiError(404, "Contact not found")
        res.json({success:true, contact})
})

export const deleteContact = asyncHandler(async(req,res)=>{
    const id = objectId.parse(req.params.id)

    const contact = await Contact.findOneAndDelete(
        {_id:id, owner:req.user._id}
    )
    if(!contact ) throw new ApiError(404,"Contact not found")
        res.json({success:true, message:"Contact deleted"})
})