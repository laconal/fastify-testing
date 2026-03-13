import type { FastifyRequest, FastifyReply } from "fastify"
import { ExceptionsHandler, PrismaExceptionHandler, type CustomError, type PrismaCustomError } from "../exceptions/index.js"
// import { bookServiceCreate, bookServiceDelete, bookServiceGet, bookServiceGetByAuthor, bookServiceUpdate } from "../services/book-service.js"
// import { bookGet } from "../repos/book-repos.js"
// import type { newBookInterface } from "../routes/books-router/schemas.js"
// import { getUser } from "../repos/users-repos.js"

import { grpcCreateBook } from "../grpc-server.js"
import type { newBookInterface } from "../routes/books-router/schemas.js"

// export const bookControllerGet = async(req: FastifyRequest, res: FastifyReply) => {
//     const {id} = req.params as {id: number}
//     try {
//         const result = await bookServiceGet(id)
//         return res.status(200).send(result)
//     } catch (err) {ExceptionsHandler(err as CustomError, req, res)}
// }

// export const bookControllerGetBooksByAuthor = async(req: FastifyRequest, res: FastifyReply) => {
//     const {authorID, authorUsername} = req.query as {authorID?: number, authorUsername: string}
//     try {
//         const findUserArgs: {id?: number, username?: string} = {}
//         if (authorID) findUserArgs.id = authorID
//         if (authorUsername) findUserArgs.username = authorUsername

//         const author = await getUser(findUserArgs)
//         if (!author) throw "404"   

//         const result = await bookServiceGetByAuthor(author.id)
//         return res.status(200).send(result)
//     } catch (err) {ExceptionsHandler(err as CustomError, req, res)}
// }

export const bookControllerCreate = async(req: FastifyRequest, res: FastifyReply) => {
    try {
        if (!req.currentUser) throw "401"
        const {title} = req.body as newBookInterface
        const book = await grpcCreateBook(title, req.currentUser.id)
        return res.status(201).send(book)
    } catch (err) { ExceptionsHandler(err as CustomError, req, res) }
}

// export const bookControllerUpdate = async(req: FastifyRequest, res: FastifyReply) => {
//     const {id} = req.params as {id: number}
//     try {
//         if (!req.currentUser) throw "401"

//         // check if book exists and user who tries to edit is author
//         const found = await bookGet(id)
//         if (req.currentUser.id !== found.authorID) throw "401"

//         const {title} = req.body as {title: string}

//         // return error if current title == new title
//         if (found.title === title) throw "400"

//         const data = {
//             id: id,
//             title: title
//         }
//         await bookServiceUpdate(data)
//         return res.status(200).send({message: "Book successfully updated"})
//     } catch (err) { ExceptionsHandler(err as CustomError, req, res) }
// }

// export const bookControllerDelete = async(req: FastifyRequest, res: FastifyReply) => {
//     const {id} = req.params as {id: number}
//     try {
//         if (!req.currentUser) throw "401"
        
//         const found = await bookGet(id)
//         if (req.currentUser.id !== found.authorID) throw "401"
        
//         await bookServiceDelete(id)
//         return res.status(200).send({message: `Book with ID ${id}, title: ${found.title} successfully deleted`})

//     } catch (err) { ExceptionsHandler(err as CustomError, req, res) }
// }