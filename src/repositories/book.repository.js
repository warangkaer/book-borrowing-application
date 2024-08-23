const { prisma } = require("../index.repository");

module.exports.findAllBooks = async () => {
  const allBooks = await prisma.book.findMany({
    select: {
      code: true,
      title: true,
      author: true,
      stock: true,
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

  const mappedBooks = allBooks.map((book) => {
    return {
      ...book,
      available_books: book.stock - book._count?.member_book,
    };
  });

  return mappedBooks;
};

module.exports.isBookAvailable = async (book_code) => {
  const bookAvailability = await prisma.book.findUnique({
    where: {
      code: book_code,
    },
    select: {
      stock: true,
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
  console.log(bookAvailability);
  return bookAvailability?.stock > bookAvailability?._count.member_book;
};
