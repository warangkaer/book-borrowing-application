const { findAllBooks } = require("../repositories/book.repository");

exports.getAllBooks = async (req, res) => {
  const allBooks = await findAllBooks();

  if (!allBooks) {
    return res.status(404).json({ message: "data not found", data: {} });
  }

  return res.status(200).json({ message: "success", data: allBooks });
};
