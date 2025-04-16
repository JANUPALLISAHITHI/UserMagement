// const express = require("express");
// const mysql = require("mysql2");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());


// const db = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     password: "Sahithi@547",
//     database: "data",
//     port: 3306,
//     waitForConnections: true,
//     connectionLimit: 10, 
//     queueLimit: 0
// });


// db.getConnection((err, connection) => {
//     if (err) {
//         console.error("Database connection failed:", err.message);
//     } else {
//         console.log("Connected to MySQL Database");
//         connection.release(); 
//     }
// });


// app.get("/", (req, res) => {
//     res.send("Welcome to the User Management API");
// });


// app.get("/users", (req, res) => {
//     db.query("SELECT * FROM users", (err, result) => {
//         if (err) {
//             console.error("Error fetching users:", err);
//             return res.status(500).json({ error: "Internal Server Error" });
//         }
//         res.json(result);
//     });
// });


// app.post("/register", (req, res) => {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//         return res.status(400).json({ error: "All fields are required" });
//     }

//     const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
//     db.query(sql, [name, email, password], (err, result) => {
//         if (err) {
//             console.error("Error registering user:", err);
//             return res.status(500).json({ error: "Database error" });
//         }
//         res.json({ message: "User added successfully", userId: result.insertId });
//     });
// });

// const PORT = 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });



// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.error(err));

// app.use("/users", require("./routes/userRoutes"));

// app.listen(5000, () => console.log("Server running on port 5000"));



// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import userRoutes from "./routes/userRoutes.js";


// dotenv.config();
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log("MongoDB Connection Error:", err));

// app.use("/users", userRoutes);

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";

// dotenv.config();
// const app = express();


// app.use(express.json());
// app.use(cors());

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log("Connected to MongoDB"))
// .catch(err => console.error(err));


// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   age: Number
// });

// const User = mongoose.model("User", userSchema);


// app.post("/users", async (req, res) => {
//   try {
//     const { name, email, age } = req.body;
//     const newUser = new User({ name, email, age });
//     await newUser.save();
//     res.status(201).json({ message: "User created", user: newUser });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.get("/users", async (req, res) => {
//   const users = await User.find();
//   res.json(users);
// });


// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";

// dotenv.config();
// const app = express();

// app.use(express.json());
// app.use(cors());

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log("Connected to MongoDB"))
// .catch(err => console.error(err));

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   age: Number
// });

// const User = mongoose.model("User", userSchema);

// // Create User
// app.post("/users", async (req, res) => {
//   try {
//     const { name, email, age } = req.body;
//     const newUser = new User({ name, email, age });
//     await newUser.save();
//     res.status(201).json({ message: "User created", user: newUser });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Get All Users
// app.get("/users", async (req, res) => {
//   const users = await User.find();
//   res.json(users);
// });

// // Update User
// // app.put("/users", async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
// //     if (!updatedUser) return res.status(404).json({ message: "User not found" });
// //     res.json({ message: "User updated", user: updatedUser });
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });
// app.put("/users/:id", async (req, res) => {
//   try {
//     const { name, email, age } = req.body;
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       { name, email, age },
//       { new: true } // Returns the updated document
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.json({ message: "User updated", user: updatedUser });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// // Delete User
// app.delete("/users", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedUser = await User.findByIdAndDelete(id);
//     if (!deletedUser) return res.status(404).json({ message: "User deleted successfully" });
//     res.json({ message: "User deleted" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import userRoutes from "./routes/userRoutes.js";

// dotenv.config();
// const app = express();

// app.use(express.json());
// app.use(cors());

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("Connected to MongoDB"))
// .catch(err => console.error(err));

// app.use("/users", userRoutes);

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
