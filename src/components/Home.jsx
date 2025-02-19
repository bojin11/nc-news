import { getArticles } from "./api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArticles().then((articles) => {
      setArticles(articles);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading articles...</p>
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
  );
}
