"use client";

import { useRouter } from "next/navigation";
import PostForm from "@/components/PostForm";
import { createPost } from "@/lib/api";

export default function CreatePost() {
  const router = useRouter();

  async function handleCreate(formData) {
    const data = await createPost(formData);
    router.push(`/view-post/${data.post._id}`);
  }

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Create post</h1>

      <PostForm onSubmit={handleCreate} submitText="Create post" />
    </main>
  );
}
