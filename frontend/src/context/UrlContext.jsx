import React, { createContext, useContext, useState, useEffect } from "react";

const UrlContext = createContext();

export const UrlProvider = ({ children }) => {
  const [urls, setUrls] = useState(() => {
    const stored = localStorage.getItem("shortenedUrls");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("shortenedUrls", JSON.stringify(urls));
  }, [urls]);

  const addUrl = (newUrl) => {
    setUrls((prev) => [...prev, newUrl]);
  };

  const updateClickData = (shortcode, clickInfo) => {
    setUrls((prev) =>
      prev.map((url) =>
        url.shortCode === shortcode
          ? {
              ...url,
              clicks: url.clicks + 1,
              clickDetails: [...url.clickDetails, clickInfo],
            }
          : url
      )
    );
  };

  return (
    <UrlContext.Provider value={{ urls, addUrl, updateClickData }}>
      {children}
    </UrlContext.Provider>
  );
};

export const useUrl = () => useContext(UrlContext);
