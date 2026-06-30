import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { createContact, deleteContact, getContact, getContacts, updateContact } from "../controllers/contact.controller.js";

const router = Router();

router.use(protect)

router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact)


export default router