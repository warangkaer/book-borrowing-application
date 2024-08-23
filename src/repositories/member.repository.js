const { prisma } = require("../index.repository");
const { sumDate } = require("../../utilities/date");

module.exports.findAllMembers = async () => {
  const allUsers = await prisma.member.findMany({
    include: {
      _count: {
        select: { member_book: true },
      },
    },
  });

  return allUsers;
};

module.exports.isHasReachedMaxLimitBorrowing = async (member_code) => {
  const totalBorrowedBooks = await prisma.member.findUnique({
    where: {
      code: member_code,
    },
    select: {
      _count: {
        select: {
          member_book: {
            where: {
              returned_date: null,
            },
          },
        },
      },
    },
  });

  return totalBorrowedBooks?._count.member_book >= 2;
};

module.exports.isPenalized = async (member_code) => {
  const isPenalized = await prisma.log_Member_Penalty.findFirst({
    where: {
      memberCode: member_code,
    },
    select: {
      penalty_date: true,
    },
    orderBy: {
      penalty_date: "desc",
    },
  });

  const lastPenalizedDate = isPenalized?.penalty_date;
  if (!lastPenalizedDate) {
    return false;
  }

  return sumDate(lastPenalizedDate, 3) > new Date();
};

module.exports.memberBorrowBook = async (member_code, book_code) => {
  try {
    const borrowBook = await prisma.member_Book.create({
      data: {
        memberCode: member_code,
        bookCode: book_code,
      },
    });

    if (!borrowBook) {
      throw new Error("Fail to insert record");
    }

    return { data: borrowBook, message: "success" };
  } catch (error) {
    return { data: {}, message: error.message };
  }
};

module.exports.checkMemberBorrowedTheBook = async (member_code, book_code) => {
  const checkBorrowedBook = await prisma.member_Book.findFirst({
    select: {
      id: true,
      borrowed_date: true,
    },
    where: {
      memberCode: member_code,
      bookCode: book_code,
      returned_date: null,
    },
    orderBy: {
      borrowed_date: "asc",
    },
  });

  return checkBorrowedBook;
};

module.exports.memberReturnTheBook = async (id) => {
  try {
    const returnTheBook = await prisma.member_Book.update({
      data: {
        returned_date: new Date(),
      },
      where: {
        id: id,
      },
    });

    if (!returnTheBook) {
      throw new Error("Failed to update record");
    }

    return { data: returnTheBook, message: "success" };
  } catch (error) {
    return { data: {}, message: error.message };
  }
};

module.exports.penaltyTheMember = async (member_code) => {
  try {
    const member = await prisma.log_Member_Penalty.create({
      data: {
        memberCode: member_code,
      },
    });

    if (!member) {
      throw new Error("Failed to insert record");
    }

    return { data: member, message: "success" };
  } catch (error) {
    return { data: {}, message: error.message };
  }
};
