import Link from "next/link";
import PostFeed from "@/components/PostFeed";

export default function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-8">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Posts</h1>

        <Link
          href="/create-post"
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white"
        >
          Create post
        </Link>
      </header>

      <PostFeed />
    </main>
  );
}
