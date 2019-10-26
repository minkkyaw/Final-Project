import axios from "axios";

const transport = axios.create({ withCredentials: true });

const signIn = (email, password) => {
  return axios.post("/api/users/signin", {
    email,
    password
  });
};

const signUp = input => {
  return axios.post("/api/users/signup", input);
};

const signOut = () => {
  return axios.get("/api/users/signout");
};

const postPost = post => {
  return transport.post("/api/posts/", { post });
};

const getAllPosts = () => {
  return transport.get("/api/posts/");
};

const postComment = (comment, postId) => {
  return transport.post(`/api/posts/${postId}/comments`, { comment });
};

const getAllCommentsByPost = postId => {
  return transport.get(`/api/posts/${postId}/comments`);
};

const getRecentCommentsByPost = postId => {
  return transport.get(`/api/posts/${postId}/comments/recent`);
};

const searchPosts = searchInput => {
  return transport.get(`/api/posts?search=${searchInput}`);
};

const likePost = (postId, likeOrDislike) => {
  return transport.patch(`/api/posts/${postId}?like=${likeOrDislike}`);
};

const setPost = async (setPosts, data) => {
  let response;
  if (data) response = await searchPosts(data);
  else response = await getAllPosts();
  setPosts(response.data.data.data);
};

const getUserWithPosts = userId => {
  return transport.get(`/api/users/${userId}/posts`);
};

const getPlaces = (zip, keyword) => {
  zip = 19106;
  keyword="bowling";
  return transport.get(`/api/posts/googlePlace?keyword=${keyword}&zip=${zip}`);
};

export default {
  signIn,
  signUp,
  signOut,
  postPost,
  getAllPosts,
  postComment,
  getAllCommentsByPost,
  getRecentCommentsByPost,
  searchPosts,
  likePost,
  setPost,
  getUserWithPosts,
  getPlaces
};
