import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Articles from "./components/Articles";
import Topic from "./components/Topic";
import ArticleDetails from "./components/ArticleDetails";
import { useState, useEffect } from "react";
import { getArticles } from "./api/services/articles";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    getArticles().then((res) => {
      console.log("app", res);
      if (res.status === 200) {
        setArticles(res.data.articles);
        setLoading(false);
      }
    });
  }, []);
  return (
    <>
      <Home />
      <Routes>
        <Route
          path="/"
          element={<Articles articles={articles} loading={loading} />}
        />
        <Route
          path="/topics/:topicName"
          element={<Topic articles={articles} loading={loading} />}
        />
        <Route path="/article/:id" element={<ArticleDetails />} />
      </Routes>
    </>
  );
}

export default App;
