import { createTRPCRouter } from "y/server/api/trpc";
import { commentRouter } from "./routers/comment";
import { postRouter } from "./routers/post";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post:postRouter,
  comment:commentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
