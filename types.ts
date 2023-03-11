import { Prisma } from "@prisma/client";

export type PostWithPayload = Prisma.PostGetPayload<{
    include:{
        author:true
    }
}>