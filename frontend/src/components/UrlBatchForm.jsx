import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
} from "@mui/material";
import { useUrl } from "../context/UrlContext";
import { generateShortcode } from "../utils/urlUtils";

const defaultRow = { longUrl: "", customCode: "", validity: "" };
const defaultError = { longUrl: "", customCode: "", validity: "" };

const UrlBatchForm = () => {
  const { addUrl, urls } = useUrl();
  const [rows, setRows] = useState([defaultRow]);
  const [errors, setErrors] = useState([defaultError]);

  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);

    const updatedErrors = [...errors];
    updatedErrors[index][field] = ""; 
    setErrors(updatedErrors);
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleAddRow = () => {
    if (rows.length < 5) {
      setRows([...rows, defaultRow]);
      setErrors([...errors, defaultError]);
    }
  };

  const handleSubmit = () => {
    const updatedErrors = [...errors];
    let hasError = false;

    const validRows = rows.filter((row) => row.longUrl.trim() !== "");

    validRows.forEach((row, index) => {
      
      updatedErrors[index] = { ...defaultError };

      if (!isValidUrl(row.longUrl)) {
        updatedErrors[index].longUrl = "Enter a valid URL";
        hasError = true;
      }

      if (row.validity && (isNaN(row.validity) || Number(row.validity) <= 0)) {
        updatedErrors[index].validity = "Enter a valid number > 0";
        hasError = true;
      }

      const code = row.customCode || generateShortcode();
      const alreadyExists = urls.some((url) => url.shortCode === code);

      if (row.customCode && alreadyExists) {
        updatedErrors[index].customCode = "Shortcode already exists";
        hasError = true;
      }
    });

    setErrors(updatedErrors);

    if (hasError) return;

    
    validRows.forEach((row) => {
      const code = row.customCode || generateShortcode();
      const createdAt = Date.now();
      const validity = row.validity ? parseInt(row.validity) : 30;
      const expiresAt = createdAt + validity * 60 * 1000;

      addUrl({
        longUrl: row.longUrl,
        shortCode: code,
        createdAt,
        expiresAt,
        clicks: 0,
        clickDetails: [],
      });
    });

    setRows([defaultRow]);
    setErrors([defaultError]);
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
      <Typography variant="h5" gutterBottom>
        Shorten URLs (up to 5)
      </Typography>

      {rows.map((row, index) => (
        <Grid container spacing={2} key={index} sx={{ marginBottom: 2 }}>
          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              required
              label="Long URL"
              value={row.longUrl}
              onChange={(e) => handleChange(index, "longUrl", e.target.value)}
              error={Boolean(errors[index]?.longUrl)}
              helperText={errors[index]?.longUrl}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Custom Shortcode"
              value={row.customCode}
              onChange={(e) =>
                handleChange(index, "customCode", e.target.value)
              }
              error={Boolean(errors[index]?.customCode)}
              helperText={errors[index]?.customCode}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              label="Validity (min)"
              type="number"
              value={row.validity}
              onChange={(e) =>
                handleChange(index, "validity", e.target.value)
              }
              error={Boolean(errors[index]?.validity)}
              helperText={errors[index]?.validity}
            />
          </Grid>
        </Grid>
      ))}

      {rows.length < 5 && (
        <Button
          variant="outlined"
          onClick={handleAddRow}
          sx={{ marginRight: 2 }}
        >
          + Add More
        </Button>
      )}

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Shorten URLs
      </Button>
    </Paper>
  );
};

export default UrlBatchForm;
