export const API_NOTIFICATION_MESSAGE = {
  loading: {
    title: "Loading...",
    message: "Data is being loaded, Please wait !",
  },
  success: {
    title: "Success",
    message: "Data is successfully loaded",
  },
  responseFailure: {
    title: "Error",
    message:
      "An error occured while fetching response from the server, Please try again.",
  },
  requestFailure: {
    title: "Error",
    message: "An error occured while parsing request data",
  },
  networkFailure: {
    title: "Error",
    message:
      "Unable to connect with the server, Please check your network and try again later",
  },
};

export const SERVICE_URL = {
  userSignup: { url: "/signup", method: "POST" },
  userLogin: { url: "/login", method: "POST" },
  uploadFile: { url: "/file/upload", method: "POST" },
  createPost: { url: "/create", method: "POST" },
  getAllPosts: { url: "/posts", method: "GET", params: true },
  getPostById: { url: "/post", method: "GET", query: true },
  updatePost: { url: "update", method: "PUT", query: true },
  deletePost: { url: "delete", method: "DELETE", query: true },
  newComment: { url: "/comment/new", method: "POST" },
  getComment: { url: "comments", method: "GET", query: true },
  deleteComment: { url: 'comment/delete', method: 'DELETE', query: true },
};
