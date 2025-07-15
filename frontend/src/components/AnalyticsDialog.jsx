import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import dayjs from "dayjs";

const AnalyticsDialog = ({ url, onClose }) => {
  return (
    <Dialog open={!!url} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Analytics for Shortcode: {url.shortCode}</DialogTitle>

      <DialogContent dividers>
        <Typography variant="subtitle2">
          Total Clicks: {url.clicks}
        </Typography>

        {url.clickDetails.length === 0 ? (
          <Typography variant="body2" mt={2}>
            No clicks recorded yet.
          </Typography>
        ) : (
          <List dense>
            {url.clickDetails.map((click, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`Time: ${dayjs(click.timestamp).format(
                    "DD MMM YYYY, hh:mm A"
                  )}`}
                  secondary={`Referrer: ${click.referrer}, Location: ${click.location}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AnalyticsDialog;
