import { errorCodes, type FastifyPluginAsync } from "fastify"
import { getBookSchema, BooksSchema, newBookSchema, updateBookSchema, deleteBookSchema, getBookByUserSchema } from "./schemas.js"
import { authenticate } from "../../middlewares/authentication.js"
import { bookControllerCreate, bookControllerUpdate, bookControllerGet, bookControllerDelete, bookControllerGetBooksByAuthor } from "../../controllers/book-controller.js"
import { bookGetAll } from "../../repos/book-repos.js"

const book_routes: FastifyPluginAsync = async(fastify) => {
    fastify.get("/books", BooksSchema, async() => { return await bookGetAll() } )
    
    fastify.get("/books/:id", getBookSchema, bookControllerGet)

    fastify.get("/books/", getBookByUserSchema, bookControllerGetBooksByAuthor)

    fastify.post("/books", {preHandler: authenticate, schema: newBookSchema}, bookControllerCreate)

    fastify.put("/books/:id", {preHandler: authenticate, schema: updateBookSchema}, bookControllerUpdate)

    fastify.delete("/books/:id", {preHandler: authenticate, schema: deleteBookSchema}, bookControllerDelete)

}

export default book_routes