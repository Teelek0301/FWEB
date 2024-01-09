import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";


const router = express.Router();

// This section will help you get a list of all members
router.get("/", async (req, res) => {
    let collection = await db.collection("members");
    let result = await collection.find({}).toArray();
    res.send(result).status(200);
});

// This section will help you get a single member by id
router.get("/:id", async (req, res) => {
    let collection = await db.collection("members");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Member not found!").status(404);
    else res.send(result).status(200);
});

// This section will help you register a new member
router.post("/", async (req, res) => {
    const { name, password, matriculation_number, title, age } = req.body;


    // Validate password
    if (!isValidPassword(password)) {
        res.status(400).send("Invalid password. Password must be 8 characters long, contain at least 1 uppercase letter, 1 lowercase letter, and 1 special character.");
        return;
    }

    let newDocument = {
        name,
        password,
        matriculation_number,
        title,
        age
    };
    let collection = await db.collection("members");
    let result = await collection.insertOne(newDocument);

    res.status(201).send(result);
});

// validate fucntion
function isValidPassword(password) {
    // Define a regular expression for the password requirements
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Check if the password matches the pattern
    return passwordRegex.test(password);
}



// This section will help you update a member by id
router.patch("/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
        $set: {
            name: req.body.name,
            age: req.body.age,
            belt: req.body.belt,
            achievement: req.body.achievement,
            height: req.body.height,
            aboutMe: req.body.aboutMe,
            title: req.body.title,
            matriculation_number: req.body.matriculation_number







        }
    }

    


   

    let collection = await db.collection("members");
    let result = await collection.updateOne(query, updates);

    res.status(200).send(result);
});


router.delete("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };

        const collection = await db.collection("members");
        const result = await collection.deleteOne(query);

        if (result.deletedCount === 1) {
            // Member was deleted
            res.status(200).send("Member deleted successfully.");
        } else {
            // No Member was deleted, indicating it's already deleted or not found
            res.status(404).send("Member not found or already deleted.");
        }
    } catch (error) {
        // Handle other errors
        console.error("Error deleting member:", error);
        res.status(500).send("Internal Server Error");
    }
});

export default router;