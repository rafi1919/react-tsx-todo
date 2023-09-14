import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
  Card,
  CardContent,
  CardActions
} from "@mui/material"
import axios from 'axios';

const Dashboard: React.FC = () => {
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
    if ( todo.warn === "Important" ) {
      return { color: 'red' }; 
    } else {
      return { color: 'green' };
    }
  }

  return (
    <>
      <Box>
        <FormControlLabel
              control={<Checkbox />}
              checked={orderByWarn}
              onChange={toggleOrderByWarn}
          label="Order by Urgency"
          style={{ padding: '10px', textAlign: 'left', fontSize: '1rem' }}
        />
        <Grid container  justifyContent="center" spacing={2}>
        {sortedTodos.map((todo: any) => (
          <Grid item key={todo.id}>
            {editTodo.id === todo.id ? (
              <Card sx={{ maxWidth: 275 }}>
              <CardContent>
                <TextField
                  label="Edit Todo"
                  variant="outlined"
                  fullWidth
                  value={editTodo.text}
                  onChange={handleEditTodoChange}
                />
                <RadioGroup
                  defaultValue="outlined"
                  name="radio-buttons-group"
                  value={editWarnTodo.text}
                  onChange={handleEditWarnTodoChange}
                >
                  <FormControlLabel
                    value="Important"
                    control={<Radio />}
                    label="Important"
                  />
                  <FormControlLabel
                    value="Chill"
                    control={<Radio />}
                    label="Chill"
                  />
                </RadioGroup>
                <CardActions>
                  <Button variant="contained" onClick={handleUpdateTodo}>
                    Update
                  </Button>
                </CardActions>
                </CardContent>
              </Card>
            ) : (
              <Card sx={{ maxWidth: 275, fontWeight: 'bold'}}>
                {/* <Typography 
                sx={{
                  fontSize:'2rem',
                  position:'absolute',
                  fontWeight:'bolder',
                  color:'#FC3122',
                  shadow:3
                }}>{todo.id}</Typography> */}
                <CardContent>
                <Typography sx={{ fontWeight: 'bold' }}>{todo.activ}</Typography>
                <Typography sx={warnColour(todo)}>urgency : {todo.warn}</Typography>

                <CardActions>
                  <Button variant="contained" onClick={() => handleDelete(todo.id)} sx={{background:'#FC3122'}}>
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleEdit(todo.id, todo.activ)} sx={{background:'#000000'}}>
                    Edit
                  </Button>
                </CardActions>
                </CardContent>
              </Card>
            )}
          </Grid>
        ))}
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
