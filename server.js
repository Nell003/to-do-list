const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

let tasks = []; 


app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});


app.post('/api/tasks', (req, res) => {
    const task = req.body.task;
    if (task) {
      tasks.push(task);
      res.json({ message: 'Tarefa adicionada com sucesso!' });
    } else {
      res.status(400).json({ error: 'A tarefa não pode ser nula' });
    }
  });


app.delete('/api/tasks/:id', (req, res) => {
  const id = req.params.id;
  if (id < tasks.length) {
    tasks.splice(id, 1);
    res.json({ message: 'Tarefa excluída com sucesso!' });
  } else {
    res.status(404).json({ error: 'Tarefa não encontrada' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
