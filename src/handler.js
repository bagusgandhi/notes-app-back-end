const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (req, h) => {
  const { title, tags, body } = req.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  // Success response condition
  if (isSuccess) {
    const res = h.response({
      status: 'success',
      message: 'Notes has been addes!',
      data: {
        noteId: id,
      },
    });
    res.code(201);
    return res;
  }

  // failed response condition
  const res = h.response({
    status: 'fail',
    message: 'Failure getting Note data',
  });
  res.code(500);
  return res;
};

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

module.exports = { addNoteHandler, getAllNotesHandler };
