//Backend Authors: Jonathan Haddad 40111053, Saad Hanna  40113826
const path = require('path');
const mongoose = require("mongoose");

const express = require("express");
const { connectDB } = require("./config/connectDB.js");
const userRouter = require("./routes/accountRoute");
const cvRouter = require("./routes/cvRoute");
const userPropertyRouter = require("./routes/userPropertyRoute");
const connectionRoutes = require("./routes/connectionRoute");
const feedRoutes = require("./routes/feedsRoute");
const jobPostsRouter = require("./routes/jobPostsRoute");
const messagesRouter = require("./routes/messagesRoute");
const groupRouter = require("./routes/groupRoute");
const eventRouter = require("./routes/eventRoute");
const companiesRouter = require("./routes/companyRoute.js");
const notificationRouter = require("./routes/notificationRoute.js");

const dotenv = require("dotenv");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

dotenv.config();
// connectDB();
mongoose.connect('mongodb+srv://doadmin:4jg96731JCP8oMv0@test-92875802.mongo.ondigitalocean.com/admin')

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.static('static'))

app.use("/api/account", userRouter);
app.use("/api/user/cv", cvRouter);
app.use("/api/user/property", userPropertyRouter);
app.use("/api/user/connection", connectionRoutes);
app.use("/api/user/feed", feedRoutes);
app.use("/api/user/jobPosts", jobPostsRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/groups", groupRouter);
app.use("/api/events", eventRouter);
app.use("/api/companies", companiesRouter);
app.use("/api/notifications", notificationRouter);

app.use("/server/attachments/messages", express.static("server/attachments/messages"));
app.use("/server/attachments/feeds", express.static("server/attachments/feeds"));
app.use("/server/attachments/avatars", express.static("server/attachments/avatars"))

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'static/index.html'))
})

const port = process.env.PORT || 8080;
app.listen(port, () =>
  console.log(`App listening on port ${port}!`)
);
