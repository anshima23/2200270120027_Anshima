import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Divider,
  TextField,
  Stack,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import BarChartIcon from "@mui/icons-material/BarChart";
import dayjs from "dayjs";

const UrlCard = ({ url, onAnalyticsClick }) => {
  const shortUrl = `${window.location.origin}/${url.shortCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("✅ Short URL copied to clipboard!");
  };

  return (
    <Card
      elevation={4}
      sx={{
        mb: 4,
        borderRadius: 3,
        backgroundColor: "#fafafa",
        padding: 3,
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#1565c0" }}
        >
          🔗 Shortened URL Info
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Stack spacing={2}>
          <TextField
            label="Original URL"
            value={url.longUrl}
            InputProps={{ readOnly: true }}
            variant="outlined"
            fullWidth
          />

          <Stack direction="row" spacing={1}>
            <TextField
              label="Short URL"
              value={shortUrl}
              InputProps={{ readOnly: true }}
              variant="outlined"
              fullWidth
            />
            <Tooltip title="Copy to clipboard">
              <IconButton color="primary" onClick={handleCopy}>
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </Stack>

          <TextField
            label="Created At"
            value={dayjs(url.createdAt).format("DD MMM YYYY, hh:mm A")}
            InputProps={{ readOnly: true }}
            variant="outlined"
            fullWidth
          />

          <TextField
            label="Expires At"
            value={dayjs(url.expiresAt).format("DD MMM YYYY, hh:mm A")}
            InputProps={{ readOnly: true }}
            variant="outlined"
            fullWidth
          />

          <TextField
            label="Total Clicks"
            value={url.clicks}
            InputProps={{ readOnly: true }}
            variant="outlined"
            fullWidth
          />

          <Button
            variant="contained"
            color="secondary"
            startIcon={<BarChartIcon />}
            onClick={() => onAnalyticsClick(url)}
          >
            View Analytics
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default UrlCard;
