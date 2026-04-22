const mongoose = require("mongoose");
const dbDebug = require("debug")("LibanCoin:DataBase");
const config = require("config");
const _ = require("lodash");
const Fawn = require("fawn");

dbDebug(`Connecting to ${config.get("mogodbURL")}`);
mongoose.Promise = global.Promise;
mongoose
    .connect(config.get("mogodbURL"), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => dbDebug("Conected"))
    .catch((err) =>
    {
        dbDebug(`Could not connect: ${err.message}`);
        process.exit(1);
    });
Fawn.init(mongoose);

//shcemas
const userSchema = require("./schema/User");
const adminSchema = require("./schema/Admin");
const categorySchema = require("./schema/Category");
const currencySchema = require("./schema/Currency");
const productSchema = require("./schema/Product");
//mongodb collections
const User = mongoose.model("users", userSchema);
const Admin = mongoose.model("admins", adminSchema);
const Category = mongoose.model("categories", categorySchema);
const Currency = mongoose.model("currencies", currencySchema);
const Product = mongoose.model("products", productSchema);
//exports
exports.User = User;
exports.Admin = Admin;
exports.Category = Category;
exports.Currency = Currency;
exports.Product = Product;
exports.Fawn = Fawn;
exports.connection = mongoose;
