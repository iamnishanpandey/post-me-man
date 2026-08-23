"use client";

import { useEffect, useState } from "react";
import { fetchPosts } from "@/lib/api.js";
import PostCard from "@/components/PostCard.jsx";

const POSTS_PER_LOAD = 6;

export default function PostFeed() {
  const [allPosts, setAllPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(POSTS_PER_LOAD);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPosts() {
      try {
        const posts = await fetchPosts();
        setAllPosts(posts);
      } catch {
        setError("Could not load posts.");
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  if (loading) {
    return <p className="text-center">Loading posts...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  if (allPosts.length === 0) {
    return <p className="text-center text-zinc-500">No posts yet.</p>;
  }

  const postsToShow = allPosts.slice(0, visiblePosts);
  const hasMorePosts = visiblePosts < allPosts.length;

  return (
    <>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {postsToShow.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </section>

      {hasMorePosts && (
        <button
          onClick={() => setVisiblePosts((current) => current + POSTS_PER_LOAD)}
          className="mx-auto mt-8 block rounded-lg bg-black px-5 py-2 text-sm font-medium text-white"
        >
          Load more
        </button>
      )}

      {!hasMorePosts && (
        <p className="mt-8 text-center text-sm text-zinc-500">No more posts</p>
      )}
    </>
  );
}
