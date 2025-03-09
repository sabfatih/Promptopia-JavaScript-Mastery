"use client";
import { useState, useEffect } from "react";
import { useSession } from "@node_modules/next-auth/react";
import { useRouter } from "@node_modules/next/navigation";

import Profile from "@app/components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleEdit = (postId) => {
    router.push(`/update-prompt?id=${postId}`);
  };

  const handleDelete = async (post) => {};

  const [posts, setPosts] = useState([]);

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
