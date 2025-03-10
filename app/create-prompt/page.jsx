"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "@node_modules/next-auth/react";
import { useRouter } from "@node_modules/next/navigation";

import Form from "@app/components/Form";

const CreatePrompt = () => {
  const session = useSession().data;
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tags: [],
  });

  // useEffect(() => {
  //   console.log(post.tags);
  // }, [post]);

  const createPrompt = async (e) => {
    const inputtedTag = e.target.tagInput.value;
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",

        body: JSON.stringify({
          userId: session?.user.id,
          prompt: post.prompt,
          tags: inputtedTag
            ? [...post.tags, inputtedTag.toLowerCase().replace(" ", "-")]
            : post.tags,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
