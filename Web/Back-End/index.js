console.info("loading debug...");
const apiDebug = require("debug")("LibanCoin:api");
const loaderDebug = require("debug")("LibanCoin:Info ");
loaderDebug("loading winston...");
const winston = require("winston");
loaderDebug("loading winston express-async-errors...");
require("express-async-errors");
loaderDebug("loading express...");
const express = require("express");
loaderDebug("loading config...");
const config = require("config");
loaderDebug("loading error-hundler...");
const errorHundler = require("./middleware/error-hundler");
loaderDebug("loading CORS...");
const cors = require("cors");
loaderDebug("loading express body parser");
const bodyParser = require("body-parser");
if (!(config.get("jwtKey") && config.get("rootPass")))
{
    console.error(" FATAL ERROR: jwtPrivateKey is not set !!");
    process.exit(1);
}
loaderDebug("loading express file upload...");
const fileUpload = require("express-fileupload");
loaderDebug("initializing express...");
const app = express();
loaderDebug("initializing winston...");
winston.add(new winston.transports.File({ filename: "logfile.log" }));
loaderDebug("FINISHED");
//get routers
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const categoryRoute = require("./routes/categoryRoute");
const currencyRoute = require("./routes/currencyRoute");
const productRoute = require("./routes/productRoute");
//express setup
app.use(cors());
app.use(bodyParser());
app.use(
    fileUpload({
        createParentPath: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//using routes goes here
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/category", categoryRoute);
app.use("/api/currency", currencyRoute);
app.use("/api/product", productRoute);
app.use(errorHundler);

const port = process.env.PORT || 2000;
setTimeout(() =>
{
    app.listen(port, () =>
    {
        apiDebug(`Listning on port ${port}...`);
    });
}, 1000);
