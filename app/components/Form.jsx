"use client";
import React, { useState } from "react";
import Link from "@node_modules/next/link";
import { useRouter } from "@node_modules/next/navigation";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  const router = useRouter();
  const [tag, setTag] = useState("");

  const handleTagInput = (e) => {
    const regex = /^[A-Za-z\s]+$/;

    if (e.key === "Enter" && tag.trim() != "") {
      e.preventDefault();

      setPost((prev) => {
        if (prev.tags.includes(tag) || !regex.test(tag)) {
          return prev;
        } else {
          return {
            ...prev,
            tags: [...prev.tags, tag.toLowerCase().replace(" ", "-")],
          };
        }
      });
      setTag("");
    }
  };

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with the any AI-powered platform
      </p>

      <form
        onSubmit={(e) => handleSubmit(e)}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font_satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) =>
              setPost((prev) => {
                return { ...prev, prompt: e.target.value };
              })
            }
            placeholder="Write your prompt here..."
            className="form_textarea"
          ></textarea>
        </label>
        <div>
          <label htmlFor="tagInput">
            <span className="font_satoshi font-semibold text-base text-gray-700">
              Tags
            </span>
          </label>
          <Tags tags={post.tags} setPost={setPost} />
          <input
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            onKeyDown={(e) => handleTagInput(e)}
            id="tagInput" // need an id, not a name
            name="tagInput"
            placeholder="product, idea, recipe, etc"
            autoComplete="off"
            className="form_input"
          />
        </div>
        <div className="flex-end mx-3 mb-5 gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="text-gray-500 text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white cursor-pointer"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

const Tags = ({ tags, setPost }) => {
  const handleClose = (e, i) => {
    e.preventDefault();

    setPost((prev) => {
      return {
        ...prev,
        tags: prev.tags.filter((_, index) => index !== i),
      };
    });
  };

  return (
    <div className="flex flex-wrap gap-2 my-2">
      {tags.map((tag, i) => (
        <div
          key={i}
          className="rounded-2xl shadow px-2.5 py-1.5 flex gap-2 w-fit bg-white"
        >
          <p className="text-sm text-gray-900 my-auto">{tag}</p>
          <button
            type="button"
            className="my-auto cursor-pointer size-4"
            onClick={(e) => {
              handleClose(e, i);
            }}
          >
            <IconCloseButton />
          </button>
        </div>
      ))}
    </div>
  );
};

export const IconCloseButton = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-full m-auto "
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
};

export default Form;
