
const express = require("express");
const app = express();
const DB = require("./Config/db");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { cloudinaryConnect } = require("./Config/cloudinary");
const userRoutes = require("./Routes/User");
const contactRoutes = require("./Routes/Contact");
const orphanageRoutes = require("./Routes/Orphange");
const childrenRoutes = require("./Routes/Children");


dotenv.config();
const PORT = process.env.PORT || 4000;


// Connect to DB
DB.connect();

// // Middlewares
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true,  
};

app.use(cors(corsOptions));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// // Connect to Cloudinary
cloudinaryConnect();

// // Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/orphanages", orphanageRoutes);
app.use("/api/v1/children", childrenRoutes);


// // Test route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running ...",
  });
});

// Listen
app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
