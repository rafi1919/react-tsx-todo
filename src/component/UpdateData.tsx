import React, {useEffect, useState} from 'react';
import { Box, Typography, Button, Grid, TextField} from "@mui/material"
import axios from 'axios';

const UpdateData: React.FC = () =>{
    const [todos, setTodo] = useState<any[]>([]);
    const [editTodo, setEditTodo] = useState<{ id: number | null; text: string }>({
      id: null,
      text: '',
    });

    useEffect(() => {
      axios
      .get('http://localhost:3000/todo')
      .then ((response)=> {
        setTodo(response.data);
      })
      .catch((error) => {
        console.error('error');
      });
    }, []);

    //delete
    const handleDelete = (id: number) => {
        axios
          .delete(`http://localhost:3000/todo/${id}`)
          .then(() => {
            setTodo((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
          })
          .catch((error) => {
           console.log(error.message);
          });
      };  

      //update
      const handleUpdateTodo = () => {
        if (editTodo.id !== null) {
          axios
            .put(`http://localhost:3000/todo/${editTodo.id}`, {
              activ: editTodo.text,
            })
            .then((response) => {
              const updatedTodos = todos.map((todo) =>
                todo.id === editTodo.id ? response.data : todo
              );
              setTodo(updatedTodos);
              setEditTodo({ id: null, text: '' });
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

    return(
        <>
          <Box>
            {todos.map((todo: any) => (
              <Grid item key={todo.id}>
                {editTodo.id === todo.id ? (
                  <div>
                    <TextField
                      label="Edit Todo"
                      variant="outlined"
                      fullWidth
                      value={editTodo.text}
                      onChange={handleEditTodoChange}
                    />
                    <Button variant="contained" onClick={handleUpdateTodo}>
                      Update
                    </Button>
                  
                  </div>
                ) : (
                  <div>
                    <Typography>{todo.activ}</Typography>
                    <Button variant="contained" onClick={() => handleDelete(todo.id)}>
                      Delete
                    </Button>
                    <Button variant="contained" onClick={() => handleEdit(todo.id, todo.activ)}>
                      Edit
                    </Button>
                  </div>
                )}
              </Grid>
            ))}
          </Box>
        </>
    )
}
export default UpdateData