//Kumod
import express from 'express'
import Glass from '../models/glass.js'
import {
  postAGlass,
  getAllGlasses,
  getSingleGlass,
  UpdatedGlass,
  deleteAGlass,
  
} from '../controllers/glassController.js'
const router = express.Router();

//frontend -> backend server -> controller -> book schema -> database -> send to server -> back to the front end

//post a glass
router.post("/create-glass", postAGlass);

//get all glasses
router.get("/", getAllGlasses);

//single glass endpoint
router.get("/:id", getSingleGlass);

//update glass endpoint
router.put("/edit/:id", UpdatedGlass);

//delete glass
router.delete("/:id", deleteAGlass);

export default router;
