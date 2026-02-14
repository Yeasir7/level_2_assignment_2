import app from "./app.js";
import config from "./config.ts"

app.listen(config.port, ()=>{
    console.log(`server is running on port ${config.port}`);
})