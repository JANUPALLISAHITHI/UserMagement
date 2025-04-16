// import express from "express";
// import mongoose from "mongoose";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import cors from "cors";
// import { authenticateToken } from "./auth.js";

// const app = express();
// app.use(express.json());
// app.use(cors());

// // MongoDB Connection
// mongoose.connect("mongodb://127.0.0.1:27017/usermanagement", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// const UserSchema = new mongoose.Schema({
//     email: String,
//     password: String,
// });
// const User = mongoose.model("User", UserSchema);




// // Register Route
// app.post("/register", async (req, res) => {
//     // try {
//     //     const { email, password } = req.body;
//     //     console.log(req.body)
//     //     const hashedPassword = await bcrypt.hash(password, 10, (err, hash) => {
//     //         console.log("hash", hash);
//     //         if (err) {
//     //             return res.status(500).json({ message: "Error hashing password" });
//     //         }
//     //     });
//     //     //   console.log("hash pass", hashedPassword)
//     //     const newUser = new User({ email, password: hashedPassword });
//     //     await newUser.save();
//     //     res.status(201).json({ message: "User registered successfully" });

//     // }
//     try {
//         const { email, password } = req.body;
//         console.log(req.body);

//         // Properly await bcrypt.hash instead of using a callback
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = new User({ email, password: hashedPassword });
//         await newUser.save();

//         res.status(201).json({ message: "User registered successfully" });
//     } catch (error) {
//         if(error.code === 11000) {
//             return res.status(400).json({ message: "Email already exists" });
//         }
//         console.error(error);
//         res.status(500).json({ message: "Error registering user" });
//     }
// })

// // Login Route
// app.post("/login", async (req, res) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1h" });
//     res.json({ token });
// });

// app.get("/protected", authenticateToken, (req, res) => {
//     res.json({ message: "Protected data accessed", user: req.user });
// });


// app.listen(3001, () => console.log("Server running on port 3001"));

import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import { authenticateToken } from "./auth.js";
import User from "./models/User.js"; // ✅ Import User model here
import userRoutes from "./routes/userRoutes.js"; // ✅ Import userRoutes

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/usermanagement", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Register Route
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    console.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1h" });
  res.json({ token });
});

// Protected Route
app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Protected data accessed", user: req.user });
});


app.listen(3001, () => console.log("Server running on port 3001"));
