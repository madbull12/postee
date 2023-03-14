import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  createPost: publicProcedure
    .input(z.object({ content: z.string(), title: z.string() }))
    .mutation(({ ctx, input }) => {
      const { content, title } = input;
      const userId = ctx.session?.user.id;
      if (!ctx.session) {
        throw new Error("You have to be logged in first!!");
      }
      return ctx.prisma.post.create({
        data: {
          content,
          title,
          author: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }),
  deletePost: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      const { id } = input;
      const userId = ctx.session?.user.id;
      if (!ctx.session) {
        throw new Error("You have to be logged in first!!");
      }
      return ctx.prisma.post.delete({
        where: {
          id,
        },
      });
    }),
  updatePost: publicProcedure
    .input(z.object({ content: z.string(), title: z.string(), id: z.string() }))
    .mutation(({ ctx, input }) => {
      const { content, title, id } = input;
      const userId = ctx.session?.user.id;
      if (!ctx.session) {
        throw new Error("You have to be logged in first!!");
      }
      return ctx.prisma.post.update({
        where: {
          id,
        },
        data: {
          content,
          title,
          author: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }),
  getAllPosts: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      include: {
        author: true,
        comments:{
          include:{
            author:true,
            childComments:true
          }
        }
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
  getPostDetails: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      const { id } = input;
      return ctx.prisma.post.findUnique({
        where: {
          id,
        },
        include: {
          author: true,
        },
      });
    }),
});
