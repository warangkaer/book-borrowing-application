# CODE TEST PT EIGEN

## - Book Borrowing Applicatio

### For First installation of Book Borrowing Application
1. change the directory to book_borrowing_application
2. copy .env.example and rename it to .env, then configure it.
3. run `npm install`.
4. run `npx prisma db seed`.
5. for development environment i'm using nodemon, so u just need to run `nodemon .` in the root of the project.
6. to run the unit test you just need to run `npm test` in the root folder.

### All plugins of Book Borrowing Application

1. express.
2. nodemon.
3. prisma.
4. chai & mocha.
5. dotenv

### Aditional information

- I considered using a login feature by utilizing jsonwebtoken, but I don’t think it’s needed, as all requirements can be met without it.
