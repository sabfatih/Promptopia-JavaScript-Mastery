"use client";
import { useState, useEffect } from "react";
import { useSession } from "@node_modules/next-auth/react";
import { useRouter } from "@node_modules/next/navigation";

import Profile from "@app/components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  const handleEdit = (postId) => {
    router.push(`/update-prompt?id=${postId}`);
  };

  const handleDelete = async (postId) => {
    const hasConfirmed = confirm("Are you sure want to delete this prompt?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${postId.toString()}`, {
          method: "DELETE",
        });
        setPosts((prev) =>
          prev.filter((p) => p._id.toString() !== postId.toString())
        );
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    if (session?.user.id) {
      fetchPosts();
    }
  }, [session]);

  return (
    <Profile
      name="My"
      desc="Welcome to you personalize profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
