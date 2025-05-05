import { Request, Response } from 'express';
import { Task } from '../models/Task';

// Array para armazenar tarefas em memória
let tasks: Task[] = [];
// Variável para gerar IDs para tarefas
let currentId = 1;

/**
 * Obtém todas as tarefas armazenadas.
 * Método: GET
 * Retorna um array contendo todas as tarefas.
 */
export const getAllTasks = (req: Request, res: Response) => {
    res.json(tasks);
};

/**
 * Obtém uma tarefa específica pelo ID.
 * Método: GET
 * @param req - Requisição contendo o ID da tarefa nos parâmetros
 * @param res - Resposta contendo a tarefa encontrada ou erro 404
 */
export const getTaskByid = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const task = tasks.find(t => t.id === id);
    if (!task) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    res.json(task);
};

/**
 * Cria uma nova tarefa.
 * Método: POST
 * @param req - Requisição contendo o título e descrição da tarefa no corpo
 * @param res - Resposta contendo a tarefa criada ou erro 400 se o título estiver ausente
 */
export const createTask = (req: Request, res: Response) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Título é obrigatório' });
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

/**
 * Atualiza uma tarefa existente.
 * Método: PUT
 * @param req - Requisição contendo o ID da tarefa nos parâmetros e os campos a serem atualizados no corpo
 * @param res - Resposta contendo a tarefa atualizada ou erro 404 se não encontrada
 */
export const updateTask = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const { title, description, completed } = req.body;
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    tasks[taskIndex] = {
        ...tasks[taskIndex],
        title: title ?? tasks[taskIndex].title,
        description: description ?? tasks[taskIndex].description,
        completed: completed ?? tasks[taskIndex].completed
    };
    res.json(tasks[taskIndex]);
};

/**
 * Exclui uma tarefa existente pelo ID.
 * Método: DELETE
 * @param req - Requisição contendo o ID da tarefa nos parâmetros
 * @param res - Resposta vazia com status 204 se a exclusão for bem-sucedida ou erro 404 se a tarefa não existir
 */
export const deleteTask = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    tasks.splice(taskIndex, 1);
    res.status(204).send();
};