import { grpcCreateBook } from "../grpc-server.js"
import type { bookInterface, newBookInterface } from "../routes/books-router/schemas.js"

// export const bookServiceGet = async(id: number) => {
//     const result = await bookGet(id)
//     if (!result) throw "404"
//     return result
// }

// export const bookServiceGetByAuthor = async(id: number) => {
//     return await bookGetByAuthor(id)
// }

export const bookServiceCreate = async(data: newBookInterface, userID: number) => {
    await grpcCreateBook(data.title, userID)
}

// export const bookServiceUpdate = async(data: bookInterface) => {
//     const result = await bookUpdate(data)
//     if (!result) throw "500"
//     return result
// }

// export const bookServiceDelete = async(id: number) => {
//     const result = await bookDelete(id)
//     if (!result) throw "500"
// }