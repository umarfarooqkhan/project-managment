import { Request, Response, NextFunction } from 'express';

import { User } from '../../db/models/user';
import { Project } from '../../db/models/projects'; 

// Add a new project
export const addProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description } = req.body;

    // Validate required fields
    if (!name) {
      return res.status(400).json({ message: 'Missing required field: name' });
    }

    const newProject = await Project.create({ name, description });
    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
};

// Get all projects
export const getAllProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projects = await Project.findAll();
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

// Get project by ID
export const getProjectById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

// Update a project
export const updateProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.name = name || project.name;
    project.description = description || project.description;

    await project.save();

    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

// Delete a project
export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.destroy();
    res.status(200).json({ message: 'Project deleted successfully' })
  } catch (error) {
    next(error);
  }
};
