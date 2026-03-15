import type { FastifyRequest, FastifyReply } from "fastify"
import { ExceptionsHandler, PrismaExceptionHandler, type CustomError, type PrismaCustomError } from "../exceptions/index.js"
import { bookServiceCreate, bookServiceDelete, bookServiceGet, bookServiceGetAll, bookServiceUpdate } from "../services/book-service.js"
import { GRPC_METRICS_HEADER } from "@grpc/grpc-js/build/src/orca.js"
import * as grpc from "@grpc/grpc-js"
// import { bookServiceCreate, bookServiceDelete, bookServiceGet, bookServiceGetByAuthor, bookServiceUpdate } from "../services/book-service.js"
// import { bookGet } from "../repos/book-repos.js"
// import type { newBookInterface } from "../routes/books-router/schemas.js"
// import { getUser } from "../repos/users-repos.js"

export const bookControllerGet = async(req: FastifyRequest, res: FastifyReply) => {
    const {id} = req.params as {id: string}
    try {
        const result = await bookServiceGet(Number(id))
        return res.status(200).send(result)
    } catch (err) {ExceptionsHandler(err as CustomError, req, res)}
}

export const bookControllerGetAll = async(req: FastifyRequest, res: FastifyReply) => {
    try {
        const result = await bookServiceGetAll()
        return res.status(200).send(result)
    } catch (err) {ExceptionsHandler(err as CustomError, req, res)}
}

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
        const data = {...req.body as {}, authorID: req.currentUser.id}
        const book = await bookServiceCreate(data)
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

export const bookControllerDelete = async(req: FastifyRequest, res: FastifyReply) => {
    const {id} = req.params as {id: string}
    try {
        if (!req.currentUser) throw "409"
        const result = await bookServiceDelete(Number(id))
        return res.status(200).send(result)
    } catch (err: any) {
        if (err.code === grpc.status.NOT_FOUND) return res.status(404).send({message: "Record not found"})
        if (err.code === grpc.status.INVALID_ARGUMENT) return res.status(400).send({message: "Bad request"})
        ExceptionsHandler(err as CustomError, req, res)
    }
}

export const bookControllerUpdate = async(req: FastifyRequest, res: FastifyReply) => {
    try {
        if (!req.currentUser) throw "409"
        const {id} = req.params as {id: number}
        const data = {...req.body as {}, id: id}
        const result = await bookServiceUpdate(data)
        return res.status(201).send(result)
    } catch (err: any) {
        if (err.code === grpc.status.NOT_FOUND) return res.status(404).send({message: "Record not found"})
        if (err.code === grpc.status.INVALID_ARGUMENT) return res.status(400).send({message: "Bad request"})
        ExceptionsHandler(err as CustomError, req, res)
    }
}