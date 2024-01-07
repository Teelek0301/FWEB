import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";


const router = express.Router();

// This section will help you get a list of all coaches
router.get("/", async (req, res) => {
    let collection = await db.collection("coaches");
    let result = await collection.find({}).toArray();
    res.send(result).status(200);
});

// This section will help you get a single coach by id
router.get("/:id", async (req, res) => {
    let collection = await db.collection("coaches");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Coach not found!").status(404);
    else res.send(result).status(200);
});

// This section will help you register a new coach
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
    let collection = await db.collection("coaches");
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
            email: req.body.email,
            mobile: req.body.mobile,
            age: req.body.age

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

    let collection = await db.collection("coaches");
    let result = await collection.updateOne(query, updates);

    res.status(200).send(result);
});


router.delete("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };

        const collection = await db.collection("coaches");
        const result = await collection.deleteOne(query);

        if (result.deletedCount === 1) {
            // coach was deleted
            res.status(200).send("coach deleted successfully.");
        } else {
            // No coach was deleted, indicating it's already deleted or not found
            res.status(404).send("coach not found or already deleted.");
        }
    } catch (error) {
        // Handle other errors
        console.error("Error deleting coach:", error);
        res.status(500).send("Internal Server Error");
    }
});

export default router;