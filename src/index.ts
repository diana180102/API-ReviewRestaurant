import express from "express";
import dotenv from 'dotenv';
import userRouter from './routers/userRoutes';


dotenv.config();

const app = express();
const port = 5501;

app.use(express.json());
app.use('/', userRouter);

app.listen(port, () => console.log(`Escuchando al puerto ${port}`));
