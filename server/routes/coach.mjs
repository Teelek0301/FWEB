import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import twoFactor from "node-2fa";
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


    try {
        if (!req.body.password || !req.body.name || !req.body.matriculation_number || !req.body.title || !req.body.age || !req.body.twoFactor_token || !req.body.twoFactor_code) {
            res.status(400).send("Please fill in all fields");
            return;
        }

        const { name, password, matriculation_number, title, age, twoFactor_token, twoFactor_code } = req.body;

        if (await db.collection("coaches").findOne({ name })) {
            res.status(400).send("Username already exists");
            return;
        }

        if (!isValidPassword(password)) {
            res.status(400).send("password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character.");
            return;
        }

        const newSecret = twoFactor.generateSecret({ name: "TwoFactorAuthenticator", account: name });


        const hashedPassword = await bcrypt.hash(password, 10);
        let newDocument = {
            name,
            hashedPassword,
            matriculation_number,
            title,
            age,
            twoFactor: newSecret
        };
        let collection = await db.collection("coaches");
        let result = await collection.insertOne(newDocument);

        res.status(201).send(result);

    } catch (error) {
        res.status(500).send({ ok: false, error: error.message });
        return;
    }




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
    const token = req.headers['x-access-token'];

    try {
        const decoded = jwt.verify(token, 'secret123')
        const id = decoded.id;
        if (id == req.params.id) {

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






            let collection = await db.collection("coaches");
            let result = await collection.updateOne(query, updates);
            res.status(200).send(result);

        } else {

            res.status(401).send("Unauthorized: Invalid token");
            return;
        }
    } catch (error) {
        res.status(401).send("Unauthorized: Invalid token");
        return;
    }

});


router.delete("/:id", async (req, res) => {
    const token = req.headers['x-access-token'];
    try {
        const decoded = jwt.verify(token, 'secret123')
        const id = decoded.id;
        if (id == req.params.id) {
            try {
                const query = { _id: new ObjectId(req.params.id) };

                const collection = await db.collection("coaches");
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
        } else {
            res.status(401).send("Unauthorized: Invalid token", id, req.params.id);
            return;
        }
    } catch (error) {
        res.status(402).send("Could Not Decode Token", id, req.params.id);
        return;
    }

});

router.post("/login", async (req, res) => {
    try {
        const { name, password, twoFactor_token, twoFactor_code } = req.body;
        const coach = await db.collection("coaches").findOne({ name });

        if (!coach) {
            return res.status(400).json({ status: "error", error: "Invalid username", user: false });
        }

        const isValidPassword = await bcrypt.compare(password, coach.hashedPassword);

        if (!isValidPassword) {
            return res.status(400).json({ status: "error", error: "Invalid password", user: false });
        }



        if (twoFactor_token) {
            const matched = twoFactor.verifyToken(twoFactor_token, twoFactor_code);

            if (!matched) {
                return res.status(400).send({ ok: false, msg: "Invalid two factor code" });
            }


            const token = jwt.sign({ name: coach.name, id: coach._id }, 'secret123');
            return res.json({ status: "success", coach: token, _id: coach._id });

        } else {
            return res.status(200).send({ ok: true, msg: "need 2fa verification", "2fa_token": verify.twofactor });
        }
    } catch {
        res.status(500).send("Internal Server Error");
        return;
    }
});

export default router;

