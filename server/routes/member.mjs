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
    const { name, password, matriculation_Number } = req.body;


    // Validate password
    if (!isValidPassword(password)) {
        res.status(400).send("Invalid password. Password must be 8 characters long, contain at least 1 uppercase letter, 1 lowercase letter, and 1 special character.");
        return;
    }

    let newDocument = {
        name,
        password,
        matriculation_Number
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
            
        }
    }

    // Check for missing values
    if (!updates.$set.name || !updates.$set.email || !updates.$set.mobile || !updates.$set.age) {
        res.status(400).send("Missing values in the request.");
        return;
    }

    // Validate email format
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (!emailRegex.test(updates.$set.email)) {
        res.status(400).send("Invalid email format.");
        return;
    }

    // Validate mobile format (8-digit number)
    const mobileRegex = /^[0-9]{8}$/;
    if (!mobileRegex.test(updates.$set.mobile)) {
        res.status(400).send("Mobile must be an 8-digit number.");
        return;
    }

    let collection = await db.collection("members");
    let result = await collection.updateOne(query, updates);

    res.status(200).send(result);
});


// This section will help you delete a record
router.delete("/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = await db.collection("records");
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 1) {
        // Record was deleted
        res.status(200).send("Record deleted successfully.");
    } else {
        // No record was deleted, indicating it's already deleted or not found
        res.status(200).send("Record is already deleted or not found.");
    }
});

export default router;