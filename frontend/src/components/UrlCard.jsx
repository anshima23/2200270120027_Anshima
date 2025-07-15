import React from "react";
import { Card, CardContent, Typography, Button, IconButton, Stack } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import BarChartIcon from "@mui/icons-material/BarChart";
import dayjs from "dayjs";

const UrlCard = ({ url, onAnalyticsClick }) => {
  const shortUrl = `${window.location.origin}/${url.shortCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Short URL copied to clipboard!");
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Original: {url.longUrl}
        </Typography>
        <Typography variant="h6" color="primary">
          Shortened: <a href={shortUrl} target="_blank" rel="noreferrer">{shortUrl}</a>
        </Typography>
        <Typography variant="body2">
          Created: {dayjs(url.createdAt).format("DD MMM YYYY, hh:mm A")}
        </Typography>
        <Typography variant="body2">
          Expires: {dayjs(url.expiresAt).format("DD MMM YYYY, hh:mm A")}
        </Typography>
        <Typography variant="body2">Total Clicks: {url.clicks}</Typography>

        <Stack direction="row" spacing={1} mt={1}>
          <IconButton onClick={handleCopy} size="small" color="primary">
            <ContentCopyIcon fontSize="small" />
          </IconButton>
          <Button
            onClick={() => onAnalyticsClick(url)}
            startIcon={<BarChartIcon />}
            variant="outlined"
            size="small"
          >
            View Analytics
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default UrlCard;
