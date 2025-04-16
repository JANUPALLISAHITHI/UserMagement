import jwt from "jsonwebtoken";


export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; // Extract the token after "Bearer "

    try {
        const verified = jwt.verify(token, "secretkey");
        req.user = verified;
        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid or expired token" });
    }
};