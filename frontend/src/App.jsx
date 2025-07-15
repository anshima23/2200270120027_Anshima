import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UrlBatchForm from "./components/UrlBatchForm";
import UrlList from "./components/UrlList";
import RedirectHandler from "./components/RedirectHandler";

const NotFound = () => <h2>Short URL not found.</h2>;

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div style={{ padding: "20px" }}>
              <UrlBatchForm />
              <UrlList />
            </div>
          }
        />
        <Route path="/:shortcode" element={<RedirectHandler />} />
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
