import React, { useState } from 'react';
import axios from 'axios';
import DeleteData from './DeleteData';

interface DeleteDataProps {
  todo: any;
}

const DeleteDataContainer: React.FC<DeleteDataProps> = ({ todo }) => {
  const [todos, setTodos] = useState<any[]>([]);

  const handleDelete = (id: number) => {
    axios
      .delete(`https://65030f9ca0f2c1f3faeb5ce1.mockapi.io/api/todo/${id}`)
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });
  };

  return (
    <DeleteData
      todo={todo}
      handleDelete={() => handleDelete(todo.id)}
    />
  );
};

export default DeleteDataContainer;
