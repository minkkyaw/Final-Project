import axios from "axios";

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
  return axios.post("/api/posts/", { post });
};

const getAllPosts = () => {
  return axios.get("/api/posts/");
};

const postComment = (comment, postId) => {
  console.log(comment);
  return axios.post(`/api/posts/${postId}/comments`, { comment });
};

const getAllCommentsByPost = postId => {
  return axios.get(`/api/posts/${postId}/comments`);
};

const getRecentCommentsByPost = postId => {
  return axios.get(`/api/posts/${postId}/comments/recent`);
};

export default {
  signIn,
  signUp,
  signOut,
  postPost,
  getAllPosts,
  postComment,
  getAllCommentsByPost,
  getRecentCommentsByPost
};
