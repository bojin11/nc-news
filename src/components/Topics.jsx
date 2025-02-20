import { useEffect, useState } from "react";
import { getTopics, getArticlesByTopic } from "./api";

export default function Topics() {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("coding");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTopics().then((topics) => {
      setTopics(topics);
    });
  }, []);

  useEffect(() => {
    if (selectedTopic) {
      setLoading(true);
      getArticlesByTopic(selectedTopic).then((fetchedArticles) => {
        setArticles(fetchedArticles);
        setLoading(false);
      });
    }
  }, [selectedTopic]);

  return (
    <div>
      <div className="topics-dropdown">
        <select
          id="topics"
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
        >
          <option value="">Select a topic</option>
          {topics.map((topic) => (
            <option key={topic.slug} value={topic.slug}>
              {topic.slug}
            </option>
          ))}
        </select>
      </div>

      <div className="articles">
        {loading ? (
          <p className="loading">Loading articles...</p>
        ) : (
          articles.map((article) => (
            <div key={article.article_id} className="article-card">
              <h3>{article.title}</h3>
              <img src={article.article_img_url} />
              <p>{article.body}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
