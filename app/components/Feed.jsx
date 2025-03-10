"use client";
import React, { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import { IconCloseButton } from "./Form";

const Feed = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [rawPosts, setRawPosts] = useState([]);
  const [posts, setPosts] = useState([]);

  // handle search change from input user
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // fetch raw data
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
      setRawPosts(data);
    };

    fetchPosts();
  }, []);

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
    <section className="feed">
      <label className="relative w-full flex-center search_input cursor-text">
        <input
          type="text"
          id="searchBar"
          placeholder="Search prompts here"
          value={searchQuery}
          onChange={handleSearchChange}
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

      <div className="mt-16 prompt_layout">
        {posts &&
          posts.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              setSearchQuery={setSearchQuery}
            />
          ))}
      </div>
    </section>
  );
};

export default Feed;
