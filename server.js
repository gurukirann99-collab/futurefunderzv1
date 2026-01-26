import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_, res) => res.send("FutureFunderz V2 API"));

app.get("/api/careers", async (req, res) => {
  // fetch from DB
  res.json([]);
});

app.get("/api/courses", async (req, res) => {
  res.json([]);
});

app.post("/api/enroll", async (req, res) => {
  res.json({ status: "enrolled" });
});

app.get("/api/jobs", async (req, res) => {
  res.json([]);
});

app.post("/api/jobs/apply", async (req, res) => {
  res.json({ status: "applied" });
});

app.get("/api/colleges", async (req, res) => {
  res.json([]);
});

app.get("/api/scholarships", async (req, res) => {
  res.json([]);
});

app.post("/api/scholarships/apply", async (req, res) => {
  res.json({ status: "applied" });
});

app.get("/api/education-loans", async (req, res) => {
  res.json([]);
});

app.post("/api/loans/apply", async (req, res) => {
  res.json({ status: "submitted" });
});

app.listen(4000, () => console.log("API running on 4000"));
