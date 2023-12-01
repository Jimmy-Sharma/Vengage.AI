const express = require("express")
const contactRouter = express.Router()
const { ContactModel } = require("../model/contacts.model")
const { model } = require("mongoose")
require("dotenv").config()
const { validate } = require("../middleware/validate")


contactRouter.post("/contacts", validate, async (req, res) => {
    let data = req.body
    try {
        let newBook = await ContactModel(data)
        newBook.save()
        res.status(201).send({
            "msg": "New Book added to DB"
        })
    } catch (error) {
        res.status(400).send({
            "msg": error.message
        })
    }
})

contactRouter.get("/contacts", async (req, res) => {
    const token = req.headers.authorization;
    const decode = jwt.verify(token, process.env.secretCode)

    try {
        if (decode) {
            const contacts = await ContactModel.find()
            res.status(200).send(contacts)
        }
    } catch (error) {
        res.status(400).send({
            "msg": error.message
        })
    }
})

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

contactRouter.get("/contacts?category", async (req, res) => {
    let quer = req.query.category
    let contacts = await ContactModel.find({ category: quer })
    console.log(quer)
    res.status(200).send(contacts)
})

contactRouter.get("/contacts?author&category", async (req, res) => {
    let aut = req.query.author
    let cat = req.query.category
    let contacts = await ContactModel.find({ author: aut, category: cat })
    res.status(200).send(contacts)
})

contactRouter.patch("/contacts/:id", async (req, res) => {
    let ID = req.params.id
    let updated = req.body

    try {
        await ContactModel.findByIdAndUpdate({ _id: ID }, updated)
        res.status(204).send({
            "msg": "Book data has been updated"
        })
    } catch (error) {
        res.send(error)
    }
})


contactRouter.delete("/contacts/:id", async (req, res) => {
    let ID = req.params.id

    try {
        await ContactModel.findByIdAndDelete({ _id: ID })
        res.status(202).send({
            "msg": "Book data has been deleted"
        })
    } catch (error) {
        res.send(error)
    }
})

module.exports = {
    contactRouter
}