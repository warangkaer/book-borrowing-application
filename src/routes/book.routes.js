/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - code
 *         - stock
 *       properties:
 *         code:
 *           type: string
 *           description: Code generated by human, and it's unique
 *         title:
 *           type: string
 *           description: The title of the book
 *         author:
 *           type: string
 *           description: The book author
 *         stock:
 *           type: int
 *           description: the amount of same book
 *       example:
 *         code: TW-11
 *         title: Twilight
 *         author: Stephenie Meyer
 *         stock: 1
 */

const express = require("express");
const router = express.Router();

const bookController = require("../controllers/book.controller");

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: The books managing API
 * /books:
 *   get:
 *     summary: Get all book list
 *     tags: [Books]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: List of all books, but borrowed and it's quantities that hasn't borrowed.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: data not found
 *
 */
router.get("/books", bookController.getAllBooks);

module.exports = router;
