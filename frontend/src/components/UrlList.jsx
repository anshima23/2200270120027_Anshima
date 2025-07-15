import React, { useState } from "react";
import { useUrl } from "../context/UrlContext";
import UrlCard from "./UrlCard";
import AnalyticsDialog from "./AnalyticsDialog";
import { Typography, Box } from "@mui/material";

const UrlList = () => {
  const { urls } = useUrl();
  const [selectedUrl, setSelectedUrl] = useState(null);

  const handleAnalyticsClick = (url) => {
    setSelectedUrl(url);
  };

  const handleCloseDialog = () => {
    setSelectedUrl(null);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        All Shortened URLs
      </Typography>

      {urls.length === 0 ? (
        <Typography>No URLs shortened yet.</Typography>
      ) : (
        urls.map((url, index) => (
          <UrlCard
            key={index}
            url={url}
            onAnalyticsClick={handleAnalyticsClick}
          />
        ))
      )}

      {/* 🧠 STEP 7 Dialog Analytics */}
      {selectedUrl && (
        <AnalyticsDialog url={selectedUrl} onClose={handleCloseDialog} />
      )}
    </Box>
  );
};

export default UrlList;
