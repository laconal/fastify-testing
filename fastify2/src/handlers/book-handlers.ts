import * as grpc from "@grpc/grpc-js"
import { bookCreate } from "../repos/book-repos.js";

export const bookHandlers = {
    CreateBook: async (call: any, callback: any) => {
        try {
            const { title, authorID } = call.request
            console.log('Received request:', call.request)
            const book = await bookCreate(title, authorID)
            callback(null, {id: book.id, title: book.title})
        } catch (err) { 
            console.error('REAL ERROR:', err)
            callback({ code: grpc.status.INTERNAL, message: 'Failed to create book' }) 
        }
    }
}