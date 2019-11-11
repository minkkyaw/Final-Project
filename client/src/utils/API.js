import axios from "axios";
import firebase from "firebase";
import "firebase/storage";

import { objToQueryString } from "../utils/utilsFunc";

const transport = axios.create({ withCredentials: true });
const firebasePhotoUpload = (userId, file) => {
  var firebaseConfig = {
    apiKey: "AIzaSyDs-rUpadv-5w_AzmdDUb5e8PDYws8osjQ",
    authDomain: "test-6444f.firebaseapp.com",
    databaseURL: "https://test-6444f.firebaseio.com",
    projectId: "test-6444f",
    storageBucket: "test-6444f.appspot.com",
    messagingSenderId: "642414957945",
    appId: "1:642414957945:web:57edc4853403300c184ba8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var metadata = {
    contentType: "image"
  };

  const fileName = `user-${userId}.jpeg`;
  const storageRef = firebase.storage().ref("/profiles/" + fileName);
  const uploadTask = storageRef.put(file, metadata);
  let photoUrl = "";
  return uploadTask.on(
    "state_changed",
    function(snapshot) {},
    function(error) {
      return error;
    },
    function() {
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        photoUrl = downloadURL;
        transport.patch(`/api/users/${userId}`, { photoUrl });
      });
    }
  );
};

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

const postPost = (post, place, zipCode) => {
  return transport.post("/api/posts/", { post, place, zipCode });
};

const getAllPosts = user => {
  let query = "";
  if (user) query = objToQueryString(user);
  return transport.get("/api/posts" + query);
};

const getAllPostsForProfile = user => {
  let query = "";
  if (user) query = objToQueryString(user);
  return axios.get("/api/posts/users" + query);
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

const postTournament = data => {
  return transport.post(`/api/tournaments/`, data);
};

const getTournaments = () => {
  return transport.get(`/api/tournaments/`);
};

const enrollTournament = tmtId => {
  return transport.patch(`/api/tournaments/${tmtId}?competitor=1`);
};

const getPlaces = (zip, keyword) => {
  return transport.get(`/api/posts/googlePlace?keyword=${keyword}&zip=${zip}`);
};

const uploadPhoto = (userId, data) => {
  return firebasePhotoUpload(userId, data);
};

export default {
  signIn,
  signUp,
  signOut,
  updateUser,
  postPost,
  getAllPosts,
  getAllPostsForProfile,
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
  getPlaces,
  uploadPhoto,
  postTournament,
  getTournaments,
  enrollTournament
};
