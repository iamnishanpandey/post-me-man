"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { deletePost, fetchPost } from "@/lib/api";
import Image from "next/image";

export default function ViewPost() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPost(id)
      .then(setPost)
      .catch(() => setError("Post not found."));
  }, [id]);

  async function handleDelete() {
    if (!confirm("Delete this post?")) return;

    await deletePost(id);
    router.push("/");
  }

  if (error) return <main className="p-6">{error}</main>;
  if (!post) return <main className="p-6">Loading...</main>;

  return (
    <div className="flex min-h-screen justify-between items-center">
      <main className="mx-auto max-w-2xl p-6 border-2">
        <Image
          src={post.image}
          alt={post.caption || "Post image"}
          height={500}
          width={500}
          className="aspect-square w-full rounded-xl object-cover"
        />

        <p className="my-5 text-lg">{post.caption}</p>

        <div className="flex gap-3">
          <Link href={`/`} className="rounded-lg bg-black px-4 py-2 text-white">
            Home
          </Link>

          <Link
            href={`/edit-post/${post._id}`}
            className="rounded-lg bg-black px-4 py-2 text-white"
          >
            Edit
          </Link>

          <button
            onClick={handleDelete}
            className="rounded-lg bg-red-600 px-4 py-2 text-white"
          >
            Delete
          </button>
        </div>
      </main>
    </div>
  );
}
