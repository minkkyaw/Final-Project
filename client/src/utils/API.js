import axios from "axios";

import { objToQueryString } from "../utils/utilsFunc";

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

const updateUser = (userId, userData) => {
  return transport.patch(`/api/users/${userId}`, userData);
};

const postPost = post => {
  return transport.post("/api/posts/", { post });
};

const getAllPosts = user => {
  let query = "";
  if (user) query = objToQueryString(user);
  return transport.get("/api/posts" + query);
};

const getPost = postId => {
  return transport.get(`/api/posts/${postId}`);
};

const updatePost = postId => {
  return transport.patch(`/api/posts/${postId}`);
};

const deletePost = postId => {
  return transport.delete(`/api/posts/${postId}`);
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

const updateComment = (postId, commentId, comment) => {
  return transport.patch(`/api/posts/${postId}/comments/${commentId}`, {
    comment
  });
};

const deleteComment = (postId, commentId) => {
  return transport.delete(`/api/posts/${postId}/comments/${commentId}`);
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

const getUser = userId => {
  return transport.get(`/api/users/${userId}`);
};

const getNotifications = () => {
  return transport.get(`/api/notifications/`);
};

const createNotifications = (postId, userId, noti) => {
  return transport.post(
    `/api/posts/${postId}/users/${userId}/notifications/`,
    noti
  );
};

const updateNotifications = () => {
  return transport.patch(`/api/notifications/`);
};

const getPlaces = (zip, keyword) => {
  zip = 19106;
  keyword = "bowling";
  return transport.get(`/api/posts/googlePlace?keyword=${keyword}&zip=${zip}`);
};

export default {
  signIn,
  signUp,
  signOut,
  updateUser,
  postPost,
  getAllPosts,
  getPost,
  deletePost,
  updatePost,
  postComment,
  updateComment,
  getAllCommentsByPost,
  getRecentCommentsByPost,
  deleteComment,
  searchPosts,
  likePost,
  setPost,
  getUser,
  getNotifications,
  createNotifications,
  updateNotifications,
  getPlaces
};
