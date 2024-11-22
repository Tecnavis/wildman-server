var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var connectDB = require("./config/db");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var Category = require("./routes/category");
var SubCategory = require("./routes/subcategory");
var admin = require("./routes/admins");
var Attribute = require("./routes/attribute");
var product = require("./routes/product");
var warehouse = require("./routes/warehouse");
var supplier = require("./routes/supplier");
var shopping = require("./routes/shopping");
var salesorder = require("./routes/salesorder");
var customer = require("./routes/customer");
var Purchse = require("./routes/purchase");
var banner = require("./routes/banner");
var notification = require("./routes/notification");
var favorite = require("./routes/favorites");
var customercart = require("./routes/customercart");
var customerorder = require("./routes/customerorder");
var razorpay = require("./routes/razorpay");
var review = require("./routes/review");
var about = require("./routes/about");
connectDB();

var app = express();
app.use(express.json({ limit: "50mb" })); // Adjust this as needed
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:3002",
      "http://localhost:3001",
      "https://wildmanpremium.com",
      "https://admin.wildmanpremium.com"
    ],
    method: ["PUT", "DELETE", "PUSH", "GET", "POST", "PATCH"],
    credential: true,
  })
);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/category", Category);
app.use("/subcategory", SubCategory);
app.use("/admin", admin);
app.use("/attribute", Attribute);
app.use("/product", product);
app.use("/review",review)
app.use("/warehouse", warehouse);
app.use("/supplier", supplier);
app.use("/shopping", shopping);
app.use("/salesorder", salesorder);
app.use("/customer", customer);
app.use("/purchase", Purchse);
app.use("/banner", banner);
app.use("/notification", notification);
app.use("/favorite", favorite);
app.use("/customercart", customercart);
app.use("/customerorder", customerorder);
app.use("/razorpay", razorpay);
app.use("/about", about);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
