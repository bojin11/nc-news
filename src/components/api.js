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

export const getArticleById = (article_id) => {
  return ncNewsApi.get(`/articles/${article_id}`).then((res) => {
    return res.data.article;
  });
};

export const getArticleCommentsById = (article_id) => {
  return ncNewsApi.get(`/articles/${article_id}/comments`).then((res) => {
    return res.data.comments;
  });
};

export const postComment = (article_id, comment) => {
  return ncNewsApi
    .post(`/articles/${article_id}/comments`, {
      author: "jessjelly",
      body: comment.body,
    })
    .then((res) => {
      return res.data.comment;
    });
};
