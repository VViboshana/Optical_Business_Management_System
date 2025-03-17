import express from 'express';
import { PORT } from './Config.js';

const app = express();

app.listen(PORT, () =>{
    console.log(`App is listening to port: ${PORT}`);
    
})