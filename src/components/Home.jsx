import { getArticles } from "./api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");

  useEffect(() => {
    setLoading(true);
    getArticles({ sort_by: sortBy, order }).then((fetchedArticles) => {
      setArticles(fetchedArticles);
      setLoading(false);
    });
  }, [sortBy, order]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const toggleOrder = () => {
    setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <div>
      <div className="sort-controls">
        <label htmlFor="sort-by">Sort by:</label>
        <select id="sort-by" value={sortBy} onChange={handleSortChange}>
          <option value="created_at">Date</option>
          <option value="title">Title</option>
          <option value="votes">Votes</option>
          <option value="body">Body</option>
          <option value="article_img_url">Article image</option>
        </select>
        <button onClick={toggleOrder}>
          {order === "asc" ? "Ascending" : "Descending"}
        </button>
      </div>

      <div>
        {loading ? (
          <p className="loading">Loading articles...</p>
        ) : (
          <div className="articles">
            <div className="article-card-container">
              <h2>Articles</h2>
              {articles.map((article) => (
                <div key={article.article_id} className="article-card">
                  <img src={article.article_img_url} alt="Article" />
                  <div className="title">{article.title}</div>
                  <div className="topic">Topic: {article.topic}</div>
                  <div className="author">Author: {article.author}</div>

                  <div className="body">
                    {article.body.length > 150
                      ? `${article.body.slice(0, 150)}...`
                      : article.body}
                  </div>

                  <div className="created-at">
                    Created at:{" "}
                    {new Date(article.created_at).toLocaleDateString()}
                  </div>
                  <div className="votes">Votes: {article.votes}</div>

                  <Link
                    to={`/articles/${article.article_id}`}
                    className="read-more-btn"
                  >
                    Read More
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
