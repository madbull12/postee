import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
    createPost:publicProcedure.input(z.object({ content:z.string(),title:z.string() })).mutation(({ ctx,input })=>{
        const { content,title } = input;
        const userId = ctx.session?.user.id;
        return ctx.prisma.post.create({
            data:{
                content,
                title,
                author:{
                    connect:{
                        id:userId
                    }
                }
                
            }
        })
    }),
    getAllPosts:publicProcedure.query(({ ctx })=>{
        return ctx.prisma.post.findMany({
         include:{
            author:true,
            
         }   
        })
    })
})
