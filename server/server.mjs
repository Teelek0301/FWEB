import express from "express";
import cors from "cors";
import members from "./routes/member.mjs";
import coaches from "./routes/coach.mjs"
import excos from "./routes/exco.mjs"


const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/members", members,);
app.use("/coaches",coaches);
app.use("/excos",excos);

//routing 
app.get("/", async (req, res) => {
    res.send("Hello World").status(200);
});


// start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
});
