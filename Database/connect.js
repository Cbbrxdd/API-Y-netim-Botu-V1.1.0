const config = require("../Settings/config");
const mongoose = require("mongoose");

mongoose.set('strictQuery', true);
mongoose.connect(config.mongoURI, {});

mongoose.connection.on('connected', async () => {
    console.log(`[SYSTEM] MongoDB connecected!`);
});