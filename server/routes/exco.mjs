import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import speakeasy from "speakeasy";
import QRCode from "qrcode";


const router = express.Router();

// This section will help you get a list of all excos
router.get("/", async (req, res) => {
    let collection = await db.collection("excos");
    let result = await collection.find({}).toArray();
    res.send(result).status(200);
});

// This section will help you get a single Exco by id
router.get("/:id", async (req, res) => {
    let collection = await db.collection("excos");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Exco not found!").status(404);
    else res.send(result).status(200);
});

// This section will help you register a new Exco
router.post("/", async (req, res) => {


    try {
        if (!req.body.password || !req.body.name || !req.body.matriculation_number || !req.body.title || !req.body.age ) {
            res.status(400).send("Please fill in all fields");
            return;
        }

        const { name, password, matriculation_number, title, age} = req.body;

        if (await db.collection("excos").findOne({ name })) {
            res.status(400).send("Username already exists");
            return;
        }

        if (!isValidPassword(password)) {
            res.status(400).send("password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character.");
            return;
        }



        const hashedPassword = await bcrypt.hash(password, 10);
        let secret = speakeasy.generateSecret({ 
            name: name
        });


        let qr = await QRCode.toDataURL(secret.otpauth_url);
        let newDocument = {
            name,
            hashedPassword,
            matriculation_number,
            title,
            age,
            secret: secret.base32,
            qr:qr

        };
        let collection = await db.collection("excos");
        let result = await collection.insertOne(newDocument);

        return res.json({ status: "success", qr:newDocument.qr,result:result});

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

    try{
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
        
        
        
        
        
        
            let collection = await db.collection("excos");
            let result = await collection.updateOne(query, updates);
            res.status(200).send(result);
            
        }else{
            
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
    try{
        const decoded = jwt.verify(token, 'secret123')
        const id = decoded.id;
        if (id == req.params.id) {
            try {
                const query = { _id: new ObjectId(req.params.id) };
        
                const collection = await db.collection("excos");
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
        }else{
            res.status(401).send("Unauthorized: Invalid token");
            return;
        }
    } catch (error) {
        res.status(401).send("Unauthorized: Invalid token");
        return;
    }
    
});
router.post("/login", async (req, res) => {
    try {
        const { name, password,sixDigitCode } = req.body;
        const exco = await db.collection("excos").findOne({ name });

        if (!exco) {
            return res.status(400).json({ status: "error", error: "Invalid username", user: false });
        }

        const isValidPassword = await bcrypt.compare(password, exco.hashedPassword);

        if (!isValidPassword) {
            return res.status(400).json({ status: "error", error: "Invalid password", user: false });
        }

        try {
            if (checkTwoFa(sixDigitCode, exco.secret) === true) {
                const token = jwt.sign({ name: exco.name, id: exco._id }, 'secret123');
                return res.json({ status: "success", exco: token, _id: exco._id});
            } else {
                return res.status(400).json({ status: "error", error: "Invalid 6 digit code", user: false });
            }
        } catch (error) {
            console.error("Error checking 2FA:", error);
            return res.status(500).json({ status: "error", error: "Internal Server Error", user: false });
        }

    } catch {
        res.status(500).send("Internal Server Error");
        return;
    }
});

function checkTwoFa(code,secret) {
    var verified = speakeasy.totp.verify({
        secret: secret,
        encoding: 'base32',
        token: code

    });
    return verified;
};

export default router;