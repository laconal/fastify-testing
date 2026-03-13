import prisma from "../lib/prisma.js";
import type { bookInterface, newBookInterface } from "../routes/books-router/schemas.js";

export const bookGetAll = async() => {
    return await prisma.book.findMany()
}

export const bookGet = async(id: number) => {
    return await prisma.book.findUniqueOrThrow({where: {id: id}})
}

export const bookGetByAuthor = async(id: number) => {
    return await prisma.book.findMany({where: { authorID: id }})
}

export const bookCreate = async(data: newBookInterface, authorID: number) => {
    return await prisma.book.create({data: {
        ...data,
        authorID: authorID
    }})
}

export const bookUpdate = async(data: bookInterface) => {
    return await prisma.book.update({
        where: {id: data.id},
        data: {
            title: data.title
        }
    })
}

export const bookDelete = async(id: number) => {
    return await prisma.book.delete({where: {id: id}})
}