"use client";
import React, { useState } from "react";
import Image from "@node_modules/next/image";
import { useSession } from "@node_modules/next-auth/react";
import { usePathname } from "@node_modules/next/navigation";
import Link from "@node_modules/next/link";

const PromptCard = ({ post, handleEdit, handleDelete, setSearchQuery }) => {
  const { data: session } = useSession();
  const pathName = usePathname();

  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    post && (
      <div className="prompt_card">
        <div className="flex justify-between items-start gap-5">
          {/* creator */}
          <Link
            href={`/profile/${post.creator._id}`}
            className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          >
            <Image
              src={post.creator.image}
              alt="User Image"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />
            <div className="flex flex-col">
              <h3 className="font-satoshi font-semibold text-gray-900">
                {post.creator.username}
              </h3>
              <p className="font-inter text-sm text-gray-500">
                {post.creator.email}
              </p>
            </div>
          </Link>
          {/* prompt */}
          <div className="copy_btn" onClick={handleCopy}>
            <Image
              src={
                copied === post.prompt
                  ? "/assets/icons/tick.svg"
                  : "/assets/icons/copy.svg"
              }
              alt="Copy button"
              width={12}
              height={12}
            />
          </div>
        </div>
        <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
        <div className="flex gap-3 flex-wrap w-full">
          {post.tags.map((tag) => (
            <a
              href={"#searchBar"}
              key={tag}
              onClick={() => setSearchQuery(tag)}
              className="font-inter text-sm hover:underline cursor-pointer text-cyan-600"
            >
              #{tag}
            </a>
          ))}
        </div>

        {session?.user.id === post.creator._id &&
          pathName.startsWith("/profile/") && (
            <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
              <p
                className="font-inter text-sm green_gradient cursor-pointer"
                onClick={() => handleEdit(post)}
              >
                Edit
              </p>
              <p
                className="font-inter text-sm orange_gradient cursor-pointer"
                onClick={() => handleDelete(post)}
              >
                Delete
              </p>
            </div>
          )}
      </div>
    )
  );
};

export default PromptCard;
