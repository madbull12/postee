import { Prisma } from "@prisma/client";

export type PostWithPayload = Prisma.PostGetPayload<{
    include:{
        author:true,
        comments:true
    }
}>
export type CommentWithPayload = Prisma.CommentGetPayload<{
    include:{
        author:true,
        childComments:{
            include:{
                author:true
            }
        }
    }
}>