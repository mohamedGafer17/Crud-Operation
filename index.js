import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bootstrap from './src/index.router.js';
// import sendEmail from './src/utils/email.js';
const app = express()
const port = 5000


// await sendEmail({to : 'medogafar812@gmail.com', subject: "jjj", html:`<p>gafer</P>`, })
app.use('/uploads', express.static("./uploads"))
bootstrap(app, express)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))