import React, { useState } from 'react';
import axios from 'axios';
import CardData from './CardData'; // Import the presentational component

const CardDataCont: React.FC = ({ todo }) => {
  const [todos, setTodos] = useState<any[]>([]);
  const [editTodo, setEditTodo] = useState<{ id: number | null; text: string }>({
    id: null,
    text: '',
  });

  const [editWarnTodo, setEditWarnTodo] = useState<{ id: number | null; text: string }>({
    id: null,
    text: '',
  });

  // Update Todo
  const handleUpdateTodo = () => {
    if (editTodo.id !== null) {
      axios
        .put(`https://65030f9ca0f2c1f3faeb5ce1.mockapi.io/api/todo/${editTodo.id}`, {
          activ: editTodo.text,
          warn: editWarnTodo.text,
        })
        .then((response) => {
          const updatedTodos = todos.map((t) =>
            t.id === editTodo.id ? response.data : t
          );
          setTodos(updatedTodos);
          setEditTodo({ id: null, text: '' });
          setEditWarnTodo({ id: null, text: '' });
        })
        .catch((error) => {
          console.error('Error updating todo:', error);
        });
    }
  };

  const handleEdit = (id: number, text: string) => {
    setEditTodo({ id, text });
  };

  const handleEditTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTodo({ ...editTodo, text: e.target.value });
  };

  const handleEditWarnTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditWarnTodo({ ...editWarnTodo, text: e.target.value });
  };

  return (
    <CardData
      todo={todo}
      editTodo={editTodo}
      editWarnTodo={editWarnTodo}
      handleEdit={handleEdit}
      handleEditTodoChange={handleEditTodoChange}
      handleEditWarnTodoChange={handleEditWarnTodoChange}
      handleUpdateTodo={handleUpdateTodo}
    />
  );
};

export default CardDataCont;
