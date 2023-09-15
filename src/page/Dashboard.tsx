import React from 'react';
import { Box, Grid, FormControlLabel, Checkbox } from "@mui/material";
import CardDataCont from '../component/CardData/CardDataCont';

interface DashboardProps {
  todos: any[];
  orderByWarn: boolean;
  toggleOrderByWarn: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  todos,
  orderByWarn,
  toggleOrderByWarn,
}) => {
  return (
    <>
      <Box className="dashboard">
        <FormControlLabel
          control={<Checkbox />}
          checked={orderByWarn}
          onChange={toggleOrderByWarn}
          label="Order by Urgency"
          style={{ padding: '10px', textAlign: 'left', fontSize: '1rem' }}
        />
        <Grid container justifyContent="center" spacing={2}>
          {todos.map((todo: any) => (
            <CardDataCont key={todo.id} todo={todo} />
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
