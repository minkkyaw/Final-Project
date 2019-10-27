import React, { createContext, useState, useEffect } from "react";

export const PostsFromProviderContext = createContext({
  hidden: true,
  toggleHidden: () => {},
  postReload: true,
  togglePostReload: () => {}
});

const PostsProvider = ({ children }) => {
  const [hidden, setHidden] = useState(false);
  const [postReload, setPostReload] = useState(false);
  const toggleHidden = () => setHidden(!hidden);
  const togglePostReload = () => setPostReload(!postReload);

  return (
    <PostsFromProviderContext.Provider
      value={{
        hidden,
        toggleHidden,
        postReload,
        togglePostReload
      }}
    >
      {children}
    </PostsFromProviderContext.Provider>
  );
};

export default PostsProvider;
