import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddData from './AddData';

interface Todo {
  activ: string;
  warn: string;
}

const AddDataContainer: React.FC = () => {
  const [newTodo, setNewTodo] = useState<string>('');
  const [warnTodo, setWarnTodo] = useState<string>('');
  const navigate = useNavigate();

  const handleNewTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
    setWarnTodo(e.target.value);
  };

  const handleWarnTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWarnTodo(e.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.length > 0 || warnTodo.length > 0) {
      // Make a POST request to add a new todo
      axios
        .post<Todo>('https://65030f9ca0f2c1f3faeb5ce1.mockapi.io/api/todo', {
          activ: newTodo,
          warn: warnTodo,
        })
        .then(() => {
          setNewTodo('');
          setWarnTodo('');
          // Navigate to the home page
          navigate('/');
        })
        .catch((error) => {
          console.error('Error adding todo:', error);
        });
    } else {
      alert('Both fields must be filled in');
    }
  };

  return (
    <AddData
      newTodo={newTodo}
      warnTodo={warnTodo}
      handleNewTodoChange={handleNewTodoChange}
      handleWarnTodoChange={handleWarnTodoChange}
      handleAddTodo={handleAddTodo}
    />
  );
};

export default AddDataContainer;
