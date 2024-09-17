// src/index.ts
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
// Define the User interface
interface User {
  id: number;
  name: string;
}
const app: Application = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.use(bodyParser.json());
// In-memory users array
let users: User[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
  { id: 4, name: 'David' },
  { id: 5, name: 'Eve' },
];
/**
* Get all users
*/
app.get('/users', (req: Request, res: Response) => {
  res.json(users);
});
/**
* Get a single user by ID
*/
app.get('/users/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const user = users.find(u => u.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});
/**
* Create a new user
*/
app.post('/users', (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }
  const newUser: User = {
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    name,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});
/**
* Update an existing user
*/
app.put('/users/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const { name } = req.body;
  const userIndex = users.findIndex(u => u.id === id);
  if (userIndex !== -1) {
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }
    users[userIndex].name = name;
    res.json(users[userIndex]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});
/**
* Delete a user
*/
app.delete('/users/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const userIndex = users.findIndex(u => u.id === id);
  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1);
    res.json(deletedUser[0]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
