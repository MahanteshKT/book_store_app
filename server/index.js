import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import morgan from "morgan";
import AuthRoutes from "./Routes/AuthRoutes.js";
import { Register } from "./controllers/AuthControllers.js";
import BooksRoutes from "./Routes/BooksRoutes.js";
import ReviewsRoutes from "./Routes/ReviewsRoutes.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

//connection to mongoose and listening on server port
const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    app.listen(PORT, () => {
      console.log("Mongodb connected successfully!");
      console.log(`server is listening in port- ${PORT}`);
    })
  )
  .catch((error) => {
    console.log("Error Ocuured onConnection to MongoDB");
    console.log(error);
  });

//middleware
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

//local storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

//routes with files
app.post("/auth/register", upload.single("picturePath"), Register);
// app.routes("/book/post",Ver)

/* Routes */
app.use("/auth", AuthRoutes);
app.use("/books", BooksRoutes);
app.use("/reviews", ReviewsRoutes);
