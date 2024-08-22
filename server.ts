import express, { Application } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors'; // <-- Import cors here
 
 
import { userRouter } from './src/routes/user';
import { projectRouter } from './src/routes/projectRoutes';
import { tasksRouter } from './src/routes/taskRoutes';
dotenv.config();
 
const app: Application = express();
 
app.use(cors());
app.use(bodyParser.json());
 
 
// Use the user router
app.use('/api/users', userRouter);
app.use('/api/projects', projectRouter);
app.use('/api/tasks', tasksRouter);
 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});