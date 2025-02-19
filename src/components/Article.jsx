import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getArticleById,
  getArticleCommentsById,
  deleteComment,
  voteOnArticle,
} from "./api";
import CommentForm from "./CommentForm";

export default function Article() {
  const { article_id } = useParams();
  const [article, setArticle] = useState([0]);
  const [articleComments, setArticleComments] = useState([]);
  const [isVoting, setIsVoting] = useState(false);
  const [error, setError] = useState("");

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

  const handleCommentPosted = (newComment) => {
    setArticleComments((prevComments) => [newComment, ...prevComments]);
  };

  const handleDeleteComment = (comment_id) => {
    deleteComment(comment_id)
      .then(() => {
        setArticleComments((prevComments) =>
          prevComments.filter((comment) => comment.comment_id !== comment_id)
        );
        alert("Comment deleted successfully");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to delete comment, please try again");
      });
  };

  const handleVote = (increment) => {
    setIsVoting(true);
    voteOnArticle(article[0].article_id, increment)
      .then((updatedArticle) => {
        setArticle([updatedArticle]);
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to update votes, please try again.");
      })
      .finally(() => {
        setIsVoting(false);
      });
  };

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
      <div className="votes">
        <span>Votes: {article[0].votes}</span>
        <button
          className="vote-button"
          onClick={() => handleVote(1)}
          disabled={isVoting}
        >
          ❤️
        </button>
      </div>

      <div className="comments">
        <h3>Comments:</h3>
        <CommentForm
          articleId={article_id}
          onCommentPosted={handleCommentPosted}
        />
        {articleComments && articleComments.length > 0 ? (
          articleComments.map((comment) => (
            <div key={comment.comment_id} className="comment-card">
              <div>{comment.body}</div>
              <div>Author: {comment.author}</div>
              {comment.author === "jessjelly" && (
                <button
                  className="delete-comment-button"
                  onClick={() => handleDeleteComment(comment.comment_id)}
                >
                  Delete Comment
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No comments</p>
        )}
      </div>
    </div>
  );
}
