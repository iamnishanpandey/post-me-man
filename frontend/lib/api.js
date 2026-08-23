const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchPosts() {
  const response = await fetch(`${API_URL}/posts`);
  if (response.status === 404) return [];
  if (!response.ok) throw new Error("Could not fetch posts");
  const posts = (await response.json()).post;
  return posts;
}

export async function fetchPost(id) {
  const response = await fetch(`${API_URL}/posts/${id}`);
  if (!response.ok) throw new Error("Could not fetch post");
  const posts = (await response.json()).post;
  return posts;
}

export async function createPost(formData) {
  const response = await fetch(`${API_URL}/create-post`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Could not create post");
  return response.json();
}

export async function updatePost(id, formData) {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: "PATCH",
    body: formData,
  });

  if (!response.ok) throw new Error("Could not update post");
  return response.json();
}

export async function deletePost(id) {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Could not delete post");
}
