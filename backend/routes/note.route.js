import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { createNotes, deleteNote, getNotes, updateNote } from "../controllers/note.controller.js";


const router = Router()

router.use(protect)

router.route("/").get(getNotes).post(createNotes)
router.route("/:id").put(updateNote).delete(deleteNote)

export default  router
