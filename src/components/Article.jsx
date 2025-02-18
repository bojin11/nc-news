import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticleById, getArticleCommentsById } from "./api";

export default function Article() {
  const { article_id } = useParams();
  const [article, setArticle] = useState([0]);
  const [articleComments, setArticleComments] = useState([]);

  useEffect(() => {
    if (article_id) {
      getArticleById(article_id).then((fetchedItems) => {
        setArticle(fetchedItems);
      });
    }
  }, [article_id]);

  useEffect(() => {
    if (article_id) {
      getArticleCommentsById(article_id).then((fetchedItems) => {
        setArticleComments(fetchedItems);
      });
    }
  }, [article_id]);

  return (
    <div key={article[0].article_id} className="article-card">
      <img src={article[0].article_img_url} alt="Article" />
      <div className="title">{article[0].title}</div>
      <div className="topic">Topic: {article[0].topic}</div>
      <div className="author">Author: {article[0].author}</div>
      <div className="body">{article[0].body}</div>

      <div className="created-at">
        Created at: {new Date(article[0].created_at).toLocaleDateString()}
      </div>
      <div className="votes">Votes: {article[0].votes}</div>

      <div className="comments">
        <h3>Comments:</h3>
        {articleComments && articleComments.length > 0 ? (
          articleComments.map((comment) => (
            <div key={comment.comment_id} className="comment-card">
              <div>{comment.body}</div>
              <div>By: {comment.author}</div>
              <div>{new Date(comment.created_at).toLocaleDateString()}</div>
            </div>
          ))
        ) : (
          <p>No comments</p>
        )}
      </div>
    </div>
  );
}
