import prisma from "../lib/prisma.js";
import type { newBookInterface } from "../schemas/book-interface.js";

export const bookGetAll = async() => {
    return await prisma.book.findMany()
}

export const bookGet = async(id: number) => {
    return await prisma.book.findUniqueOrThrow({where: {id: id}})
}

export const bookGetByAuthor = async(id: number) => {
    return await prisma.book.findMany({where: { authorID: id }})
}

export const bookCreate = async(title: string, authorID: number) => {
    return await prisma.book.create({data: {
        title: title,
        authorID: authorID
    }})
}

export const bookUpdate = async(id: number, data: {title: string}) => {
    return await prisma.book.update({
        where: {id: id},
        data: {
            title: data.title
        }
    })
}

export const bookDelete = async(id: number) => {
    return await prisma.book.delete({where: {id: id}})
}