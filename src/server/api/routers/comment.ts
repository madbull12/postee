import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const commentRouter = createTRPCRouter({
    createComment:publicProcedure.input(z.object({ parentId:z.string().nullable(), text:z.string(),postId:z.string() })).mutation(({ ctx,input })=>{
        const { postId,text,parentId } = input;
        const userId = ctx.session?.user.id;

        return ctx.prisma.comment.create({
           data:{
            parent:{
                connect:{
                    id:parentId as string
                }
            },
            post:{
                connect:{
                    id:postId as string
                }
            },
            content:text,
            author:{
                connect:{
                    id:userId
                }
            }
           } 
        })
    }),
    createFirstComment:publicProcedure.input(z.object({  text:z.string(),postId:z.string() })).mutation(({ ctx,input })=>{
        const { postId,text } = input;
        const userId = ctx.session?.user.id;

        return ctx.prisma.comment.create({
           data:{
   
            post:{
                connect:{
                    id:postId as string
                }
            },
            content:text,
            author:{
                connect:{
                    id:userId
                }
            }
           } 
        })
    })
})