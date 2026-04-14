export const getUser = () =>
  JSON.parse(localStorage.getItem("loggedInUser"));

export const getUsers = () =>
  JSON.parse(localStorage.getItem("userinfo")) || {};

export const getTasks = () =>
  JSON.parse(localStorage.getItem("tasks") || "[]");