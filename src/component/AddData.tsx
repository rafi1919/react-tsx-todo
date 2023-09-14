import React, { useState} from 'react';
import { 
  Box, 
  Button, 
  Grid, 
  TextField, 
  Radio, 
  RadioGroup, 
  FormControlLabel,
} from "@mui/material"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export interface InputStrings {
  [everyProp: string]: string
}

const AddData: React.FC = () =>{
    const [todos, setTodo] = useState<any[]>([]);
    const [newTodo, setNewTodo] = useState<string>('');
    const [warnTodo, setWarnTodo] = useState<string>('');

    const navigate = useNavigate();

      const handleNewTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodo(e.target.value);
        setWarnTodo(e.target.value)
      };

      const handleWarnTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWarnTodo(e.target.value)
      };

      const handleAddTodo = () => {

        if (newTodo.length > 0 || warnTodo.length > 0){
           // Make a POST request to add a new todo
           axios
           .post('https://65030f9ca0f2c1f3faeb5ce1.mockapi.io/api/todo', {
             activ: newTodo,
             warn: warnTodo
           })
           .then((response) => {
             setTodo((prevTodos) => [...prevTodos, response.data]);
             setNewTodo('');
             setWarnTodo('');
           })
           .catch((error) => {
             console.error('Error adding todo:', error);
           });

           //navigate page
           navigate('/');
           
        }

        else{

          alert('must input')
            
        }
      };
       
    

    return(
        <>
          <Box>
            <Grid container spacing={0} sx={{background: 'white', color:'black'}}>
              <Grid item xs={12} sx={{padding:'15px'}}>
                <TextField
                      label="New Todo"
                      variant="outlined"
                      fullWidth
                      value={newTodo}
                      onChange={handleNewTodoChange}
                    />
              </Grid>
              <Grid sx={{margin: '10px'}}>
              <RadioGroup defaultValue="outlined" name="radio-buttons-group"  value={warnTodo} onChange={handleWarnTodoChange}>
                <FormControlLabel value="Important" control={<Radio />} label="Important" />
                <FormControlLabel value="Chill" control={<Radio />} label="Chill" />
              </RadioGroup>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" onClick={handleAddTodo} sx={{margin:'20px'}}>
                      Add Todo
                </Button>
              </Grid>
            </Grid>      
          </Box>
        </>
    )
}
export default AddData