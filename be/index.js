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

// LOGIN: ký JWT và trả về
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body || {};
  const u = USERS.find((x) => x.email === email && x.password === password);
  if (!u) return res.status(401).json({ message: "Invalid email or password" });

  const accessToken = jwt.sign(
    { sub: u.id, email: u.email, roles: u.roles },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
  const { password: _, ...user } = u;
  res.json({ user, accessToken });
});

// Middleware verify JWT
function verifyJWT(req, res, next) {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Missing token" });
  try {
    req.user = jwt.verify(token, JWT_SECRET); // {sub,email,roles,iat,exp}
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

// Ví dụ API cần đăng nhập
app.get("/me", verifyJWT, (req, res) => {
  const me = USERS.find((u) => u.id === req.user.sub);
  if (!me) return res.status(404).json({ message: "User not found" });
  const { password: _, ...safe } = me;
  res.json({ me: safe });
});

app.listen(3000, () => console.log("Auth API on http://localhost:3000"));
