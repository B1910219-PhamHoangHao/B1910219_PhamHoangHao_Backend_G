const express = require("express");
const cors = require("cors");
const contactsRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api-error");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application." });
});
app.use("/api/contacts", contactsRouter);
module.exports = app;

// handle 404 response
appp.use((req, res, next) => {
    // Code ở đây sẽ chạy khi không có route nào được định nghĩa
    // khớp với yêu cầu. Gọi next() để chuyển snagr middleware xử lý lỗi
    return next(new ApiError(404, "Resource not found"));
});

// define error-handling middleeware last, after orther app.use() and routes calls
app.use((err, req, res, next) => {
    // MiddleWare xử lý lỗi tập trung.
    // Trong các đoạn code xử lý ở các route, gọi next(error)
    // sẽ chuyển về middleware xử lý lỗi này
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
    });
});