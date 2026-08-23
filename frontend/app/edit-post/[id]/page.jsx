"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PostForm from "@/components/PostForm";
import { fetchPost, updatePost } from "@/lib/api";
import Image from "next/image";

export default function EditPost() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPost(id).then(setPost);
  }, [id]);

  async function handleUpdate(formData) {
    await updatePost(id, formData);
    router.push(`/view-post/${id}`);
  }

  if (!post) return <main className="p-6">Loading...</main>;

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Edit post</h1>

      <Image
        src={post.image}
        alt={post.caption || "Current post image"}
        height={500}
        width={500}
        className="mb-5 aspect-square w-full rounded-xl object-cover"
      />

      <PostForm
        initialCaption={post.caption}
        onSubmit={handleUpdate}
        submitText="Save changes"
        imageRequired={false}
      />
    </main>
  );
}
