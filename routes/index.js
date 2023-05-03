const express = require("express");
const noteController = require("../controllers/note");

const router = express.Router();

router.get("/api/notes", noteController.getNotes);

router.post("/api/add-note", noteController.addNote);

router.delete("/api/delete-note/:id", noteController.deleteNote);

router.get("/api/notes/count", noteController.numNotes);

module.exports = router;
