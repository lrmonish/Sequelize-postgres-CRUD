const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json()); 
const { Task } = require('./models'); 

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})



app.post('/data', async (req, res) => {
  try {
    const { task, completed } = req.body; // Destructure task and completed 

    const newTask = await Task.create({ task, completed }); 

    res.json({ message: 'Task created successfully!', data: newTask });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Error creating task' }); 
  }
});

  app.get('/getdata', async (req, res) => {
    try {
      const tasks = await Task.findAll(); // Fetches all tasks 
      res.json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching tasks' }); 
    }
  });
  

  app.get('/getdatabyid/:id', async (req, res) => {
    try {
      const id = req.params.id; 
  
      const task = await Task.findByPk(id); // Find task by primary key
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.json(task);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ message: 'Error fetching task' }); 
    }
  });
  


  app.put('/updateUser/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const { task, completed } = req.body; 
  
      const [updatedCount] = await Task.update({ task, completed }, { where: { idn:id } });
  
      if (updatedCount === 0) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.json({ message: 'Task updated successfully' });
    } catch (error) {
      console.error(error); 
      res.status(500).json({ message: 'Error updating task' }); 
    }
  });

  app.delete('/deleteUser/:id', async (req, res) => {
    try {
      const id = req.params.id;
  
      const deletedCount = await Task.destroy({ where: { idn:id } });
  
      if (deletedCount === 0) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error(error); 
      res.status(500).json({ message: 'Error deleting task' }); 
    }
  });
  


Task.sequelize.sync().then((req)=>{
app.listen(5000, () => {
  console.log('Server listening on port 5000');
})
});