import React from 'react';
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid
} from "@mui/material";
import DeleteDataCont from '../DeleteData/DeleteDataCont';

interface CardDataProps {
  todo: any;
  editTodo: { id: number | null; text: string };
  editWarnTodo: { id: number | null; text: string };
  handleUpdateTodo: () => void;
  handleEdit: (id: number, text: string) => void;
  handleEditTodoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEditWarnTodoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CardData: React.FC<CardDataProps> = ({
  todo,
  editTodo,
  editWarnTodo,
  handleUpdateTodo,
  handleEdit,
  handleEditTodoChange,
  handleEditWarnTodoChange,
}) => {
  // Change color based on urgency
  const warnColour = () => {
    if (todo.warn === "Important") {
      return { color: 'red' };
    } else {
      return { color: 'green' };
    }
  };

  return (
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
        <Card sx={{ maxWidth: 275, fontWeight: 'bold' }}>
          <CardContent>
            <Typography sx={{ fontWeight: 'bold' }}>{todo.activ}</Typography>
            <Typography sx={warnColour()}>urgency : {todo.warn}</Typography>

            <CardActions>
              <DeleteDataCont key={todo.id} todo={todo} />
              <Button
                variant="contained"
                onClick={() => handleEdit(todo.id, todo.activ)}
                sx={{ background: '#000000' }}
              >
                Edit
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      )}
    </Grid>
  );
};

export default CardData;
