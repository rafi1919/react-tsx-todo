import React from 'react';
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
} from "@mui/material";

interface DashboardComponentProps {
  todos: any[];
  editTodo: { id: number | null; text: string };
  editWarnTodo: { id: number | null; text: string };
  orderByWarn: boolean;
  onToggleOrderByWarn: () => void;
  onDelete: (id: number) => void;
  onUpdate: () => void;
  onEdit: (id: number, text: string) => void;
  onEditTodoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEditWarnTodoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  warnColour: (todo: any) => { color: string };
}

const DashboardComponent: React.FC<DashboardComponentProps> = ({
  todos,
  editTodo,
  editWarnTodo,
  orderByWarn,
  onToggleOrderByWarn,
  onDelete,
  onUpdate,
  onEdit,
  onEditTodoChange,
  onEditWarnTodoChange,
  warnColour,
}) => {
  return (
    <>
      <Box>
        <FormControlLabel
          control={<Checkbox />}
          checked={orderByWarn}
          onChange={onToggleOrderByWarn}
          label="Order by Urgency"
          style={{ padding: '10px', textAlign: 'left', fontSize: '1rem' }}
        />
        <Grid container justifyContent="center" spacing={2}>
          {todos.map((todo: any) => (
            <Grid item key={todo.id}>
              {editTodo.id === todo.id ? (
                <Card sx={{ maxWidth: 275 }}>
                  <CardContent>
                    <TextField
                      label="Edit Todo"
                      variant="outlined"
                      fullWidth
                      value={editTodo.text}
                      onChange={onEditTodoChange}
                    />
                    <RadioGroup
                      defaultValue="outlined"
                      name="radio-buttons-group"
                      value={editWarnTodo.text}
                      onChange={onEditWarnTodoChange}
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
                      <Button variant="contained" onClick={onUpdate}>
                        Update
                      </Button>
                    </CardActions>
                  </CardContent>
                </Card>
              ) : (
                <Card sx={{ maxWidth: 275, fontWeight: 'bold' }}>
                  <CardContent>
                    <Typography sx={{ fontWeight: 'bold' }}>{todo.activ}</Typography>
                    <Typography sx={warnColour(todo)}>urgency : {todo.warn}</Typography>

                    <CardActions>
                      <Button
                        variant="contained"
                        onClick={() => onDelete(todo.id)}
                        sx={{ background: '#FC3122' }}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => onEdit(todo.id, todo.activ)}
                        sx={{ background: '#000000' }}
                      >
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

export default DashboardComponent;
