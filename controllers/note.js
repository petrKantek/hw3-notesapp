const CustomError = require("../models/CustomError");
const db = require("../database/dbConfig");

exports.getNotes = async (req, res, next) => {
  try {
    const notes = await db.any('select * from main.notes');
    res.status(200).json({ notes });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
}

exports.addNote = async (req, res, next) => {
  try {
    const { name, description, status } = req.body;
    const result = await db.one('insert into main.notes(name, description, status) values($1, $2, $3) returning *', [name, description, status]);
    const notes = await db.any('select * from main.notes');
    res.status(201).json({ message: 'Note added successfully', note: result, notes: notes });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
}

exports.deleteNote = async (req, res, next) => {
  try {
    const noteId = req.params.id;
    const result = await db.oneOrNone('delete from main.notes where id = $1 returning *', noteId);
    if (!result) {
      return res.status(404).json({
        message: "Note not found",
      });
    }
    const notes = await db.any('select * from main.notes');
    res.status(200).json({ message: 'Note deleted successfully', note: result, notes: notes });
  } catch (error) {
    next(new CustomError(error.message, error.status || 500));
  }
}

exports.numNotes = async (req, res, next) => {
  try {
    const result = await db.one('select count(*) from main.notes');
    res.status(200).json({ message: 'Number of notes retrieved successfully', count: result.count });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
}
