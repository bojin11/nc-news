import { useState } from "react";
import { postComment } from "./api";

export default function CommentForm({ articleId, onCommentPosted }) {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError("Comment cannot be empty");
      return;
    }

    setIsPosting(true);
    postComment(articleId, { body: comment, author: "jessjelly" })
      .then((newComment) => {
        onCommentPosted(newComment);
        setComment("");
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to post comment, please try again");
      })
      .finally(() => {
        setIsPosting(false);
      });
  };

  return (
    <div className="comment-form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="comment">Add a Comment:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment here..."
          disabled={isPosting}
        ></textarea>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={isPosting}>
          {isPosting ? "Posting..." : "Post Comment"}
        </button>
      </form>
    </div>
  );
}
