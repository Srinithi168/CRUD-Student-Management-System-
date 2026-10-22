const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static assets from workspace root
app.use(express.static(__dirname));

// Default route to courses.html or index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "courses.html"));
});

const server = app.listen(PORT, () => {
  console.log(`EduTrack server is running on http://localhost:${PORT}`);
  console.log(`Open http://localhost:${PORT}/courses.html to view courses and chatbot`);
});

module.exports = app;
