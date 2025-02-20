import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://be-nc-news-72b0.onrender.com/api",
});

// export const getArticles = () => {
//   return ncNewsApi.get("/articles").then((res) => {
//     return res.data.articles;
//   });
// };

export const getArticles = ({ sort_by, order }) => {
  return ncNewsApi
    .get(`/articles?sort_by=${sort_by}&order=${order}`)
    .then((res) => res.data.articles);
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

export const deleteComment = (comment_id) => {
  return ncNewsApi.delete(`/comments/${comment_id}`);
};

export const voteOnArticle = (article_id, inc_votes) => {
  return ncNewsApi
    .patch(`/articles/${article_id}`, {
      inc_votes: inc_votes,
    })
    .then((res) => {
      return res.data.article;
    });
};

export const getTopics = () => {
  return ncNewsApi.get("/topics").then((res) => {
    return res.data.topics;
  });
};

export const getArticlesByTopic = (topic) => {
  return ncNewsApi
    .get(`/articles?topic=${topic}`)
    .then((res) => res.data.articles);
};
