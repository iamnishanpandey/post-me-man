"use client";

import { useState } from "react";

export default function PostForm({
  initialCaption = "",
  onSubmit,
  submitText,
  imageRequired = true,
}) {
  const [caption, setCaption] = useState(initialCaption);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (imageRequired && !image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("caption", caption);

    if (image) {
      formData.append("image", image);
    }

    setLoading(true);

    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block font-medium">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(event) => setImage(event.target.files?.[0] || null)}
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Caption</label>
        <textarea
          value={caption}
          onChange={(event) => setCaption(event.target.value)}
          placeholder="Write a caption..."
          className="min-h-28 w-full rounded-lg border p-3"
        />
      </div>

      <button
        disabled={loading}
        className="rounded-lg bg-black px-5 py-2 text-white disabled:opacity-50"
      >
        {loading ? "Saving..." : submitText}
      </button>
    </form>
  );
}
