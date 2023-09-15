import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardComponent from './DashboardComponent';

const DashboardFunction: React.FC = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [orderByWarn, setOrderByWarn] = useState(false);
  const [defaultTodos, setDefaultTodos] = useState<any[]>([]); // Store default order
  const [editTodo, setEditTodo] = useState<{ id: number | null; text: string }>({
    id: null,
    text: '',
  });

  const [editWarnTodo, setEditWarnTodo] = useState<{ id: number | null; text: string }>({
    id: null,
    text: '',
  });

  useEffect(() => {
    axios
      .get('https://65030f9ca0f2c1f3faeb5ce1.mockapi.io/api/todo')
      .then((response) => {
        setTodos(response.data);
        setDefaultTodos(response.data); // Store the default order initially
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  // Delete
  const handleDelete = (id: number) => {
    axios
      .delete(`https://65030f9ca0f2c1f3faeb5ce1.mockapi.io/api/todo/${id}`)
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });
  };

  // Update Todo
  const handleUpdateTodo = () => {
    if (editTodo.id !== null) {
      axios
        .put(`https://65030f9ca0f2c1f3faeb5ce1.mockapi.io/api/todo/${editTodo.id}`, {
          activ: editTodo.text,
          warn: editWarnTodo.text,
        })
        .then((response) => {
          const updatedTodos = todos.map((todo) =>
            todo.id === editTodo.id ? response.data : todo
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

  const toggleOrderByWarn = () => {
    setOrderByWarn((prevOrderByWarn) => !prevOrderByWarn);

    if (!orderByWarn) {
      // Reset the sorting order to default when unchecked
      setTodos([...defaultTodos]);
    }
  };

  //sorted
  const sortedTodos = [...todos].sort((a, b) => {
    if (orderByWarn) {
      return a.warn.localeCompare(b.warn);
    } else {
      return 0;
    }
  });

  //change color
  const warnColour = (todo: any) => {
    if (todo.warn === "Important") {
      return { color: 'red' };
    } else {
      return { color: 'green' };
    }
  };

  return (
    <DashboardComponent
      todos={sortedTodos}
      editTodo={editTodo}
      editWarnTodo={editWarnTodo}
      orderByWarn={orderByWarn}
      onToggleOrderByWarn={toggleOrderByWarn}
      onDelete={handleDelete}
      onUpdate={handleUpdateTodo}
      onEdit={handleEdit}
      onEditTodoChange={handleEditTodoChange}
      onEditWarnTodoChange={handleEditWarnTodoChange}
      warnColour={warnColour}
    />
  );
};

export default DashboardFunction;
