import express from "express";
import router from "./src/router.js";
const app = express();

// allows us to parse json
app.use(express.json());
app.use(router);

app.listen(3000, () => console.log("Express server is running"));
