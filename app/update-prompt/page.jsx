"use client";
import { useEffect, useState } from "react";
import { useSession } from "@node_modules/next-auth/react";
import { useRouter, useSearchParams } from "@node_modules/next/navigation";
import Form from "@app/components/Form";
const UpdatePrompt = () => {
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const session = useSession().data;
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tags: [],
    creator: {
      username: "",
      email: "",
    },
  });

  useEffect(() => {
    console.log("efect kepanggil");
    const fetchPost = async () => {
      console.log("get kepanggil");
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      // console.log(" fetchPost ~ data", data);
      setPost(data);
    };

    if (promptId) {
      fetchPost();
    }
  }, []);

  const editPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      console.log(post.tags);
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",

        body: JSON.stringify({
          prompt: post.prompt,
          tags: post.tags,
        }),
      });

      if (response.ok) {
        router.push("/profile");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setSubmitting(false);
    }
  };

  {
    return (
      session?.user.id === post?.creator?._id && (
        <Form
          type="Edit"
          post={post}
          setPost={setPost}
          submitting={submitting}
          handleSubmit={editPrompt}
        />
      )
    );
  }
};

export default UpdatePrompt;
