const express = require("express")
const contactRouter = express.Router()
const { ContactModel } = require("../model/contacts.model")
require("dotenv").config()
const { validate } = require("../middleware/validate")

//route to create or add new contact to the database
contactRouter.post("/contact", validate, async (req, res) => {
    let data = req.body
    try {
        let newContact = await new ContactModel(data)
        newContact.save()
        res.status(201).send({
            "msg": "New Contact added to DB", newContact
        })
    } catch (error) {
        res.status(400).send({
            "msg": error.message
        })
    }
})

//route to get all contacts from the database
contactRouter.get("/contacts", async (req, res) => {
    try {
        const contacts = await ContactModel.find()
        res.status(200).send(contacts)
    } catch (error) {
        res.status(400).send({
            "msg": error.message
        })
    }
})

//route to get only a contact from the database with a particular id
contactRouter.get("/contacts/:id", async (req, res) => {
    let ID = req.params.id
    try {
        const contacts = await ContactModel.findOne({ _id: ID })
        res.status(200).send(contacts)
    } catch (error) {
        res.status(400).send({
            "msg": error.message
        })
    }
})

//route to update a contact from the database with a particular id
contactRouter.patch("/contacts/:id", async (req, res) => {
    let ID = req.params.id
    let updatedVersion = req.body

    try {
        await ContactModel.findByIdAndUpdate({ _id: ID }, updatedVersion)
        res.status(204).send({
            "msg": "Contact has been updated"
        })
    } catch (error) {
        res.status(400).send({
            "msg": error.message
        })
    }
})

//route to delete a contact from the database with a particular id
contactRouter.delete("/contacts/:id", async (req, res) => {
    let ID = req.params.id

    try {
        await ContactModel.findByIdAndDelete({ _id: ID })
        res.status(202).send({
            "msg": "Contact has been deleted"
        })
    } catch (error) {
        res.status(400).send({
            "msg": error.message
        })
    }
})

module.exports = {
    contactRouter
}