import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://be-nc-news-72b0.onrender.com/api",
});

export const getArticles = () => {
  return ncNewsApi.get("/articles").then((res) => {
    return res.data.articles;
  });
};

export const getUsers = () => {
  return ncNewsApi.get("/users").then((res) => {
    return res.data.users;
  });
};
