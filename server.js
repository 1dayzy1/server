
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
            <div style="font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding: 20px;">
        <div style="max-width: 600px; background: white; border: 1px solid #e0e0e0; border-radius: 8px;">
          <!-- Заголовок -->
          <div style="background: #f8f8f8; padding: 20px; text-align: center; border-bottom: 1px solid #e0e0e0;">
            <h1 style="color: red; margin: 0; font-size: 24px;">${text}</h1>
          </div>
          <!-- Контент -->
          <div style="padding: 30px;">
            <p>Ваше действие было успешно выполнено.</p>
            <p>Если у вас возникли вопросы, свяжитесь с нашей службой поддержки.</p>
          </div>
          <!-- Футер -->
          <div style="background: #f8f8f8; padding: 15px; text-align: center; font-size: 12px; color: #999;">
            © 2024 Ваша Компания. Все права защищены.
          </div>
        </div>
      </td>
    </tr>
  </table>
</div>

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

app.listen(3000, () => {
  console.log("server stared");
});
