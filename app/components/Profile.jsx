"use client";
import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { IconCloseButton } from "./Form";

const Profile = ({ name, data, handleEdit, handleDelete }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [rawPosts, setRawPosts] = useState(data);
  const [posts, setPosts] = useState(data);

  // handle search change from input user
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // find data by search query
  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const filteredData = rawPosts.filter(
        (post) =>
          // find prompt
          post.prompt
            .toLowerCase()
            .includes(searchQuery.trim().toLowerCase()) ||
          // find username
          post.creator.username
            .toLowerCase()
            .includes(searchQuery.trim().toLowerCase()) ||
          // find email
          post.creator.email
            .toLowerCase()
            .includes(searchQuery.trim().toLowerCase()) ||
          // find tag
          post.tags.some((tag) =>
            tag
              .toLowerCase()
              .includes(searchQuery.trim().replace(" ", "-").toLowerCase())
          )
      );
      setPosts(filteredData);
    } else {
      setPosts(rawPosts);
    }
  }, [searchQuery]);

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name}'s Profile</span>
      </h1>
      <p className="desc text-left">Welcome to {name}'s profile page</p>

      <label className="mt-16 relative w-full flex-center search_input cursor-text">
        <input
          type="text"
          id="searchBar"
          placeholder="Search prompts here"
          value={searchQuery}
          onChange={handleSearchChange}
          autoComplete="off"
          required
          className="w-full peer font-satoshi text-sm font-medium focus:outline-none focus:ring-0"
        />
        {searchQuery && (
          <button
            className="size-5 cursor-pointer"
            onClick={() => setSearchQuery("")}
          >
            <IconCloseButton />
          </button>
        )}
      </label>
      <div className="prompt_layout">
        {posts &&
          posts.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => {
                handleEdit(post._id);
              }}
              handleDelete={() => handleDelete(post._id)}
              setSearchQuery={setSearchQuery}
            />
          ))}
      </div>
    </section>
  );
};

export default Profile;
