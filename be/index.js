import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors());
app.use(express.json());

const USERS = [
  {
    id: "u1",
    email: "admin@demo.com",
    password: "123456",
    name: "Admin Demo",
    roles: ["admin"],
  },
];

const JWT_SECRET = "dev-secret-change-me";

app.get("/", (req, res) => {
  res.send("Auth API is running");
});

app.post("/auth/login", (req, res) => {
  const { email, password } = req.body || {};
  const u = USERS.find((x) => x.email === email && x.password === password);
  if (!u) return res.status(401).json({ message: "Invalid email or password" });

  const accessToken = jwt.sign(
    { sub: u.id, email: u.email, roles: u.roles },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  const { password: _pw, ...user } = u;
  res.json({ user, accessToken });
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Auth API running at http://localhost:${PORT}`)
);
