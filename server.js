
const express = require("express");
const cors = require("cors"); // Подключаем CORS
const app = express();
require("dotenv").config();
const nodemailer = require("nodemailer");

// Middleware должны быть ДО маршрутов
app.use(cors()); // Разрешаем кросс‑доменные запросы
app.use(express.json()); // Парсим JSON
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

app.post("/send-email", async (req, res) => {
  try {

    if (!req.body) {
        return res.status(400).json({
          success: false,
          error: "No request body"
        });
      }
  
    const { email, text } = req.body;
    console.log(email)

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Send mail",
      html: `
        <h1 style="color:red;">${text}</h1>
        `,
    });

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/", (req, res) => {
  res.json({
    success: true,
  });
});

app.listen(4444, () => {
  console.log("server stared");
});
