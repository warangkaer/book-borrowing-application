const {
  findAllMembers,
  isHasReachedMaxLimitBorrowing,
  isPenalized,
  memberBorrowBook,
  checkMemberBorrowedTheBook,
  memberReturnTheBook,
  penaltyTheMember,
} = require("../repositories/member.repository");
const { isBookAvailable } = require("../repositories/book.repository");
const { sumDate } = require("../../utilities/date");
const { prisma } = require("../index.repository");

exports.getAllMembers = async (req, res) => {
  const allMembers = await findAllMembers();

  if (!allMembers) {
    return res.status(404).json({ message: "data not found", data: {} });
  }

  return res.status(200).json({ message: "success", data: allMembers });
};

exports.borrowBook = async (req, res) => {
  try {
    if (await isHasReachedMaxLimitBorrowing(req.body.member_code)) {
      return res
        .status(422)
        .json({ message: "You already borrow too much book" });
    } else if (await isPenalized(req.body.member_code)) {
      return res.status(422).json({
        message: "You are not allowed to borrow a book, you're under penalty",
      });
    } else if (!(await isBookAvailable(req.body.book_code))) {
      return res
        .status(422)
        .json({ message: "The Book You Want to Borrow is not available" });
    }
    const result = await memberBorrowBook(
      req.body.member_code,
      req.body.book_code
    );
    if (!result.data) {
      return res
        .status(500)
        .json({ message: result.message, data: result.data });
    }

    return res.status(200).json({ message: result.message, data: result.data });
  } catch (error) {
    return res.status(500).json({ message: `error: ${error.message}` });
  }
};

exports.returnTheBook = async (req, res) => {
  const checkMemberBorrowedBook = await checkMemberBorrowedTheBook(
    req.body.member_code,
    req.body.book_code
  );

  if (!checkMemberBorrowedBook) {
    return res.status(404).json({ message: "no book borrowing records found" });
  }

  if (sumDate(checkMemberBorrowedBook.borrowed_date, 7) < new Date()) {
    const penalty = await penaltyTheMember(req.body.member_code);
    if (!penalty) {
      return res.status(500).json({ message: "something went wrong" });
    }
  }

  const processReturnTheBook = await memberReturnTheBook(
    checkMemberBorrowedBook.id
  );

  if (!processReturnTheBook) {
    return res.status(500).json({ message: "something went wrong" });
  }

  return res.status(200).json({ message: "success return the book" });
};
