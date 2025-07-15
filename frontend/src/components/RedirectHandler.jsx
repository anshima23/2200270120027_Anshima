import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUrl } from "../context/UrlContext";
import { Typography, CircularProgress, Box } from "@mui/material";
import { log } from '@logger/log';

const RedirectHandler = () => {
  const { shortcode } = useParams();
  const { urls, updateClickData } = useUrl();
  const navigate = useNavigate();

  useEffect(() => {
    const current = urls.find((url) => url.shortCode === shortcode);

    if (!current) {
      log({
        stack: "frontend",
        level: "warn",
        package: "RedirectHandler",
        message: `Shortcode "${shortcode}" not found in context.`,
      });

      setTimeout(() => {
        navigate("/not-found");
      }, 2000);
      return;
    }

    const now = Date.now();
    if (now > current.expiresAt) {
      log({
        stack: "frontend",
        level: "info",
        package: "RedirectHandler",
        message: `Shortcode "${shortcode}" has expired.`,
      });

      alert("This URL has expired.");
      navigate("/");
      return;
    }

    updateClickData(shortcode, {
      timestamp: now,
      referrer: document.referrer || "Direct",
      location: "India", 
    });

    log({
      stack: "frontend",
      level: "info",
      package: "RedirectHandler",
      message: `Redirecting shortcode "${shortcode}" to: ${current.longUrl}`,
    });

    
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
