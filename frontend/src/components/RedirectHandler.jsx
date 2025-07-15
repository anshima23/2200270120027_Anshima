import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUrl } from "../context/UrlContext";
import { Typography, CircularProgress, Box } from "@mui/material";

const RedirectHandler = () => {
  const { shortcode } = useParams();
  const { urls, updateClickData } = useUrl();
  const navigate = useNavigate();

  useEffect(() => {
    const current = urls.find((url) => url.shortCode === shortcode);

    if (!current) {
      setTimeout(() => {
        navigate("/not-found");
      }, 2000);
      return;
    }

    const now = Date.now();
    if (now > current.expiresAt) {
      alert("This URL has expired.");
      navigate("/");
      return;
    }

    // Log the click
    updateClickData(shortcode, {
      timestamp: now,
      referrer: document.referrer || "Direct",
      location: "India", // mock location
    });

    // Redirect
    window.location.href = current.longUrl;
  }, [shortcode, urls, updateClickData, navigate]);

  return (
    <Box sx={{ textAlign: "center", mt: 8 }}>
      <CircularProgress />
      <Typography variant="h6" mt={2}>
        Redirecting to original URL...
      </Typography>
    </Box>
  );
};

export default RedirectHandler;
