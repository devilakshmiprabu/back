import express from "express";
import { create, fetch, update,remove } from "../Controller/userController.js";  // Import the update function

const router = express.Router();

router.post("/create", create);  
router.get("/fetch", fetch);  
router.put("/update/:id", update);  
router.delete("/delete/:id",remove);

export default router;