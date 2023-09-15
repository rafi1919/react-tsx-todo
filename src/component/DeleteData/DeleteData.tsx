import React from 'react';
import { Button } from '@mui/material';

interface DeleteDataProps {
  todo: any;
  handleDelete: () => void;
}

const DeleteDataPresentation: React.FC<DeleteDataProps> = ({ todo, handleDelete }) => {
  return (
    <Button variant="contained" onClick={handleDelete} sx={{ background: '#FC3122' }}>
      Delete
    </Button>
  );
};

export default DeleteDataPresentation;
