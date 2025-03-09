import React from "react";
import Link from "@node_modules/next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
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
        <label>
          <span className="font_satoshi font-semibold text-base text-gray-700">
            Tags
          </span>
          <div className="flex flex-wrap gap-2">
            <Tags post={post} setPost={setPost} />
          </div>
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value.trim() != "") {
                const tag = e.target.value;
                e.preventDefault();

                setPost((prev) => {
                  return { ...prev, tags: [...prev.tags, tag] };
                });
                e.target.value = "";
              }
            }}
            placeholder="product, idea, recipe, etc"
            className="form_input"
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href={"/"} className="text-gray-500 text-sm">
            Cancel
          </Link>
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

const Tags = ({ post, setPost }) => {
  const tags = post.tags;

  return tags.map((tag, i) => (
    <div
      key={i}
      className="rounded-2xl shadow px-2.5 py-1.5 my-2 flex gap-1 w-fit bg-white"
    >
      <p className="text-sm text-gray-900 my-auto">{tag}</p>
      <button
        type="button"
        className="my-auto cursor-pointer rounded-full"
        onClick={() => {
          setPost((prev) => {
            return {
              ...prev,
              tags: prev.tags.filter((_, index) => index != i),
            };
          });
        }}
      >
        <CloseButton />
      </button>
    </div>
  ));
};

const CloseButton = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-4 m-auto"
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
