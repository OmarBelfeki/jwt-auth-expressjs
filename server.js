require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
    }
    console.log("Connected to MySQL");
});


const authenticateJWT = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Unauthenticated" });
    jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Forbidden" });
        req.user = user;
        next();
    });
};


app.get("/", (req, res) => {
    res.send("Hello World");
});


app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = "INSERT INTO user (username, email, password) VALUES (?, ?, ?)";
        db.query(sql, [username, email, hashedPassword], (err, result) => {
            if (err) {
                console.error("Error in SQL query:", err);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            return res.status(201).json({ message: "User registered successfully" });
        });
    } catch (error) {
        console.error("Error hashing password:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    const sql = "SELECT * FROM user WHERE username = ?";
    db.query(sql, [username], async (err, result) => {
        if (err) {
            console.error("Error in SQL query:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = result[0];

        const token = jwt.sign(
            { user_id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        );

        return res.status(200).json({ message: "Login successful", token });
    });
});


app.get("/protected", authenticateJWT, (req, res) => {
    return res.json({ message: "Access granted", user: req.user });
});


app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
