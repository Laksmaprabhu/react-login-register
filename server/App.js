import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import passport from 'passport';
import './config/passport.js';


const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use('/api/users', userRoutes);
app.use((err, req, res, next) => {

   console.error(err);

   res.status(500).json({
      status: "error",
      message: err.message
   });

});
export default app;