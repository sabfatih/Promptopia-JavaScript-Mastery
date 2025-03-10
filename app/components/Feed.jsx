"use client";
import React, { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

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
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search prompts here"
          value={searchQuery}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

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
