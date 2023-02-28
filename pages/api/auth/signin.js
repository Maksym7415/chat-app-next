import jwt from "jsonwebtoken";
import axios from "axios";

const jwtSecret = process.env.JWT_SECRET;

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      // Перевірте, що користувача було успішно аутентифіковано за допомогою next-auth
      const session = await getSession({ req });

      if (session) {
        // Створіть та підпишіть JWT токен за допомогою jsonwebtoken
        const token = jwt.sign(
          {
            userId: session.user.id,
            email: session.user.email,
          },
          jwtSecret,
          { expiresIn: "1h" }
        );

        // Відправте JWT токен на клієнтську сторону за допомогою axios
        await axios.post("/api/set-token", { token });

        // Перенаправте користувача на головну сторінку
        res.redirect("/");
      } else {
        res.status(401).send({ message: "Authentication error" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Server error" });
    }
  } else {
    res.status(405).send({ message: "Method not allowed" });
  }
};

export default handler;