import express from "express";
import {protect} from '../middleware/auth.middleware.js'
import { createLead, getLeads, reorderLeads,getLead, updateLead, deleteLead } from "../controllers/lead.controller.js";

const router = express.Router()

router.use(protect)

router.patch("/reorder",reorderLeads)
router.route("/").get(getLeads).post(createLead)
router.route("/:id").get(getLead).put(updateLead).delete(deleteLead)

export default router