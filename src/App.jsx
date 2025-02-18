import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Article from "./components/Article";
import Users from "./components/Users";
import { useState } from "react";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import Topics from "./components/Topics";

function App() {
  const [selectedButton, setSelectedButton] = useState("");
  return (
    <div className="App">
      <Header />
      <Router>
        <NavBar
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles/:article_id" element={<Article />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
