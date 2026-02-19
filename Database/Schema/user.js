const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({

    Username: { type: String, default: "Bot" },
    Password: { type: String, required: true },
    TwoFactor: { 
        active: { type: Boolean, default: false },
        secret: { type: String, default: null },
    },
    Auth: { type: String, required: true },
    IP: { type: String, required: true },
    DiscordId: { type: String, required: false },
    sorgular: { type: Array, default: [] },
    Notification: {
        UserIDS: { type: Array, default: [] }
    },
    PaymentInfo: {
        Balance: { type: Number, default: 0 },
        History: { type: Array, default: [] },
        Total: { type: Number, default: 0 },
    }

}); 

module.exports = mongoose.model("whitelist", customerSchema);