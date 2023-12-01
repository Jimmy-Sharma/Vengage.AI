const mongoose = require("mongoose")

const contactSchema = mongoose.Schema({
    name: String,
    number: Number
}, {
    versionKey: false
})

const ContactModel = new mongoose.model("contact", contactSchema)

module.exports = {
    ContactModel
}