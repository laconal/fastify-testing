// export const bookServiceGet = async(id: number) => {
//     const result = await bookGet(id)
//     if (!result) throw "404"
//     return result
// }

// export const bookServiceGetByAuthor = async(id: number) => {
//     return await bookGetByAuthor(id)
// }

// export const bookServiceCreate = async(data: newBookInterface, userID: number) => {    
//     CreateBook: async (call: any, callback: any) => {
//         try {
//             const { title, authorID } = call.request
//             const book = await bookCreate(title, authorID)
//             callback(null, {id: book.id, title: book.title})
//         } catch (err) { callback({ code: grpc.status.INTERNAL, message: 'Failed to create book' }) }
//       }
//     };
// }

// export const bookServiceUpdate = async(data: bookInterface) => {
//     const result = await bookUpdate(data)
//     if (!result) throw "500"
//     return result
// }

// export const bookServiceDelete = async(id: number) => {
//     const result = await bookDelete(id)
//     if (!result) throw "500"
// }