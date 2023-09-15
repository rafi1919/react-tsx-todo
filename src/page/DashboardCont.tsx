import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard'; // Import the presentational component

const DashboardCont: React.FC = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [orderByWarn, setOrderByWarn] = useState(false);
  const [defaultTodos, setDefaultTodos] = useState<any[]>([]); // Store default order

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

  const toggleOrderByWarn = () => {
    setOrderByWarn((prevOrderByWarn) => !prevOrderByWarn);

    if (!orderByWarn) {
      // Reset the sorting order to default when unchecked
      setTodos([...defaultTodos]);
    }
  };

  // Sorting Logic: Important items should come first
  const sortedTodos = [...todos].sort((a, b) => {
    if (orderByWarn) {
      if (a.warn === "Important" && b.warn !== "Important") {
        return -1;
      } else if (a.warn !== "Important" && b.warn === "Important") {
        return 1;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  });

  // Pass data and functions as props to the presentational component
  return (
    <Dashboard
      todos={sortedTodos}
      orderByWarn={orderByWarn}
      toggleOrderByWarn={toggleOrderByWarn}
    />
  );
};

export default DashboardCont;
