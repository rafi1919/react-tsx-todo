import React from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

interface AddDataProps {
  newTodo: string;
  warnTodo: string;
  handleNewTodoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleWarnTodoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddTodo: () => void;
}

const AddData: React.FC<AddDataProps> = ({
  newTodo,
  warnTodo,
  handleNewTodoChange,
  handleWarnTodoChange,
  handleAddTodo,
}) => {
  return (
    <>
      <Box>
        <Grid container spacing={0} sx={{ background: 'white', color: 'black' }}>
          <Grid item xs={12} sx={{ padding: '15px' }}>
            <TextField
              label="New Todo"
              variant="outlined"
              fullWidth
              value={newTodo}
              onChange={handleNewTodoChange}
            />
          </Grid>
          <Grid sx={{ margin: '10px' }}>
            <RadioGroup
              defaultValue="outlined"
              name="radio-buttons-group"
              value={warnTodo}
              onChange={handleWarnTodoChange}
            >
              <FormControlLabel value="Important" control={<Radio />} label="Important" />
              <FormControlLabel value="Chill" control={<Radio />} label="Chill" />
            </RadioGroup>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleAddTodo} sx={{ margin: '20px' }}>
              Add Todo
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AddData;
