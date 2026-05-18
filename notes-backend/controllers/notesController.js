const Notes = require("../models/Note.js");
const createNote = async (req, res) => {
  try {
    console.log("USER:", req.user);

    if (!req.user?.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!req.body.title || !req.body.content) {
      return res.status(400).json({ message: "Title and content required" });
    }

    const note = await Notes.create({
      title: req.body.title,
      content: req.body.content,
      user: req.user.id
    });

    res.status(201).json(note);

  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
const fetchNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const editNote = async (req, res) => {
  if (!req.body.title && !req.body.content) {
  return res.status(400).json({ message: "Nothing to update" });
}
  try {
    const note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // 🔒 Check ownership
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    note.title = req.body.title || note.title;
    note.content = req.body.content || note.content;

    const updatedNote = await note.save();

    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // 🔒 Ownership check
    if (!note.user.equals(req.user.id)) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await note.deleteOne();

    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports={createNote,fetchNotes,editNote,deleteNote};