import { Request, Response } from 'express';
import { Task } from '../models/Task';

//Array to store tasks in memory
let tasks: Task[] = [];
// var to create ids for tasks
let currentId = 1;

export const getAllTasks = (req: Request, res: Response) => {
    res.json(tasks);
};

export const getTaskByid = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const task = tasks.find(t => t.id === id);
    if (!task) {
        return res.status(404).json({ error: 'Tarefa não encontrada'})
    }
    res.json(task);
};

export const createTask = (req: Request, res: Response) => {
    const { title, description} = req.body;
    if (!title) {
        return res.status (400).json({error: 'Titulo é obrigatório'});
    }


const newTask: Task = {
    id: currentId++,
    title,
    description,
    completed: false
};

tasks.push(newTask);
res.status(201).json(newTask);
};

export const updateTask = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const { title, description, completed} = req.body;
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
        return res.status(404).json({error: 'Tarefa não encontrada'})
    }

    tasks[taskIndex] = {
        ...tasks[taskIndex],
        title: title ?? tasks[taskIndex].title,
        description: description ?? tasks[taskIndex].description,
        completed: completed ?? tasks[taskIndex].completed
    };
    res.json(tasks[taskIndex]);
};

export const deleteTask = (req: Request, res: Response) => {
    const id = parseInt(req.params.id,10);
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
        return res.status(404).json({error: 'Tarefa não encontrada'})
    }

    tasks.splice(taskIndex, 1);
    res.status(204).send();
}
