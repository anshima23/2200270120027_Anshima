// logger/log.js
const LOGGING_ENDPOINT = "https://your-test-server.com/log"; // Replace with actual endpoint

/**
 * Reusable logging function
 * @param {Object} options - Log options
 * @param {string} options.stack - Which part of the app (e.g. 'frontend', 'backend')
 * @param {string} options.level - Log level ('info', 'debug', 'warn', 'error', 'fatal')
 * @param {string} options.package - Which package/module (e.g. 'UrlContext', 'RedirectHandler')
 * @param {string} options.message - Descriptive message
 */
export async function log({ stack, level, package: pkg, message }) {
  const logPayload = {
    stack,
    level,
    package: pkg,
    message,
  };

  try {
    const response = await fetch(LOGGING_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer YOUR_ACCESS_TOKEN`, // Replace with your actual auth if needed
      },
      body: JSON.stringify(logPayload),
    });

    if (!response.ok) {
      console.warn(`Failed to log: ${response.statusText}`);
    }
  } catch (err) {
    console.error("Logging error:", err.message);
  }
}
