const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const mongoConnect = async () => {
    try {
        await mongoose.connect("mongodb://0.0.0.0/todo-list", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Mongo Conectado.");
    } catch (err) {
        console.log(err);
    }
};

mongoConnect();
