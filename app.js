import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";


const app = express();
const port = 3000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.set("view engine", "ejs");


app.use(express.static(path.join(__dirname, "public")));


app.use(bodyParser.urlencoded({ extended: true }));


const messages = [];


app.get("/", (req, res) => {
    res.render("index", { messages });
});


app.post("/submit", (req, res) => {
    const { name, message } = req.body;

    if (!name || !message) {
        return res.send("გთხოვ შეავსო ორივე ველი: სახელი და შეტყობინება.");
    }

    const date = new Date().toLocaleString();
    messages.push({ name, message, date });
    res.redirect("/");
});


app.post("/clear", (req, res) => {
    messages.length = 0;
    res.redirect("/");
});


app.listen(port, () => {
    console.log(`Guestbook app listening at http://localhost:${port}`);
});