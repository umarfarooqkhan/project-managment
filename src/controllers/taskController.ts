import { Request, Response, NextFunction } from 'express';
import { Task } from '../../db/models/task';
import { Project } from '../../db/models/projects';

// Create a new task
// Create a new task
export const createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, description, status, projectId, assignedTo, loggedInUser } = req.body;

        // Check if the project exists
        const project = await Project.findByPk(projectId);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Create the task if the project exists
        const task = await Task.create({
            name,
            description,
            status,
            projectId,
            assignedTo,
            createdBy: loggedInUser.email
        });
        res.status(201).json({
            task: {
                ...task.dataValues,
                projectName: project.name,
            }
        });
    } catch (error) {
        next(error);
    }
};

// Delete a task
export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await task.destroy();
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// Update a task
export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { name, description, status, projectId, assignedTo, loggedInUser } = req.body;
        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Check if the project exists
        const project = await Project.findByPk(projectId);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        await task.update({ name, description, status, projectId, assignedTo, updatedBy: loggedInUser.email });

        res.status(201).json({
            task: {
                ...task.dataValues,
                projectName: project.name,
            }
        });
    } catch (error) {
        next(error);
    }
};

// Get task by ID
export const getTaskById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        // Find the task by its ID
        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Find the project associated with the task
        const project = await Project.findByPk(task.projectId);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(201).json({
            task: {
                ...task.dataValues,
                projectName: project.name,
            }
        });
    } catch (error) {
        next(error);
    }
};

// Get all tasks
export const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Fetch all tasks
        const tasks = await Task.findAll();

        // Fetch project names for all tasks
        const taskDetails = await Promise.all(tasks.map(async (task) => {
            const project = await Project.findByPk(task.projectId);
            return {
                ...task.toJSON(),
                projectName: project ? project.name : 'Project not found',
            };
        }));

        res.status(200).json(taskDetails);
    } catch (error) {
        next(error);
    }
};

// Get tasks with optional filters
export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectId, status, assignedTo, createdBy } = req.query;

      console.log('projectId : ', projectId);
      console.log('status : ', status);
      console.log('assignedTo : ', assignedTo);
      console.log('createdBy : ', createdBy);
  
      // Construct the query conditions
      const queryConditions: any = {};
  
      if (projectId) {
        queryConditions.projectId = projectId;
      }
  
      if (status) {
        queryConditions.status = status;
      }
  
      if (assignedTo) {
        queryConditions.assignedTo = assignedTo;
      }

      if (createdBy) {
        queryConditions.createdBy = createdBy;
      }
  
      // Fetch tasks based on the constructed query conditions
      const tasks = await Task.findAll({
        where: queryConditions,
      });
  
      // Check if any tasks are found
      if (tasks.length === 0) {
        return res.status(404).json({ message: 'No tasks found with the given criteria' });
      }
  
      res.status(200).json(tasks);
    } catch (error) {
      next(error);
    }
  };
