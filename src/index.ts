import express from 'express';
import taskRoutes from './routes/taskRoutes';

const app = express();
const port = process.env.PORT || 3000;

// Middleware para converter requisições com JSON
app.use(express.json());

// Rotas da API
app.use('/api', taskRoutes);

// Rota raiz para teste
app.get('/', (req, res) => {
  res.send('Bem-vindo à API de Gerenciamento de Tarefas!');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});