import Image from "next/image";
import Link from "next/link";

export default function PostCard({ post }) {
  return (
    <article className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
      <Link
        href={`/view-post/${post._id}`}
        className="rounded-lgpx-4 py-2 text-white"
      >
        <Image
          src={post.image}
          alt={post.caption || "Post image"}
          height={500}
          width={500}
          className="aspect-square w-full object-cover"
        />

        {post.caption && (
          <p className="p-3 text-sm text-zinc-700">{post.caption}</p>
        )}
      </Link>
    </article>
  );
}
