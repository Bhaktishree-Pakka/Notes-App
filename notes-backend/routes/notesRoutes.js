const express = require("express"); 
const router = express.Router();

const{
    fetchNotes,
    editNote,
    deleteNote,
    createNote
}=require("../controllers/notesController")

const protect = require("../middleware/auth");

router.get("/", protect,fetchNotes);
router.post("/", protect, createNote);
router.put("/:id", protect, editNote);
router.delete("/:id", protect, deleteNote);

module.exports=router;