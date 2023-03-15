import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "y/utils/api";
import { useEffect, useState } from "react";
import Post from "y/components/Post";
import CreateForm from "y/components/CreateForm";
import PostList from "y/components/PostList";
import { PostWithPayload } from "types";
import { BiLoader, BiLoaderAlt } from "react-icons/bi";

const Home: NextPage = () => {
  const { data: posts, isLoading } = api.post.getAllPosts.useQuery();
  return (
    <>
      <Head>
        <title>Postee</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-black py-4 p-4">
        <div className="mx-auto max-w-5xl space-y-2">
          <CreateForm />
          {/* <div className="space-y-4">
          {posts?.map((post)=>(
            <Post post={post} />
          ))}
          </div> */}
          {isLoading ? (
            <BiLoaderAlt className="text-4xl text-cyan-500 animate-spin" />
          ) : (
            <PostList posts={posts as PostWithPayload[]} />
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
