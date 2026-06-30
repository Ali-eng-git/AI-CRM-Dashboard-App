import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { createTask, deletedTask, getTasks, updateTask } from "../controllers/task.controller.js";

const router = Router()

router.use(protect)

router.route("/").get(getTasks).post(createTask)
router.route("/:id").put(updateTask).delete(deletedTask)

export default router