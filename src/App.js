import React, { useState, useEffect } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import AddTodo from './AddTodo';

import './App.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchItems();
  }, [])


  const fetchItems = () => {
    fetch('https://react-bookstore-omnia-default-rtdb.europe-west1.firebasedatabase.app/items/.json')
    .then(response => response.json())
    .then(data => setTodos(Object.values(data)))
    .catch(err => console.error(err))
  }


  const addTodo = (newTodo) => {
    fetch('https://react-bookstore-omnia-default-rtdb.europe-west1.firebasedatabase.app/items/.json',
    {
      method: 'POST',
      body: JSON.stringify(newTodo)
    })
    .then(response => fetchItems())
    .catch(err => console.error(err))
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" noWrap>
            TodoList
          </Typography>
        </Toolbar>
      </AppBar> 
      <AddTodo addTodo={addTodo}/> 
      <div className="ag-theme-material" style={ { height: 400, width: 600, margin: 'auto' } }>
        <AgGridReact rowData={todos}>
          <AgGridColumn sortable={true} filter={true} field='description' />
          <AgGridColumn sortable={true} filter={true} field='date' />
          <AgGridColumn sortable={true} filter={true} field='priority' />
        </AgGridReact>
      </div>
    </div>
  );
}

export default App;