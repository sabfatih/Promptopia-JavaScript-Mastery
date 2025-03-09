import React from "react";

const Tag = () => {
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt/");
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  return <div>Tag</div>;
};

export default Tag;
