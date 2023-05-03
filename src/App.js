import React, { useState, useEffect } from 'react';
//import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import AddTodo from './AddTodo';
import ChangeTodo from './ChangeTodo';

import './App.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import { AppBar,Toolbar,Typography,IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

   
const url = 'https://react-bookstore-omnia-default-rtdb.europe-west1.firebasedatabase.app/items/';
const initialValue = { description: '', date: '', priority: '' }

function App() {
  const [todos, setTodos] = useState([]);
  /* Muutoslomakkeet tilamuuttujat */
  const [open, setOpen] = useState(false);
  const [todo, setTodo] = useState(initialValue);

  useEffect( () => { 
    fetchItems() 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] )

  const addKeys = data => {
    console.log('data I:',data)
    const keys = Object.keys(data);
    console.log('data I, keys:',keys)
    console.log('data I, values:',Object.values(data))
    // Huom. id katoaa [ ...todo] -määrityksessä
    /* const valueKeys = Object.values(data).map(
      (item, index) => Object.defineProperty(item, 'id', {value: keys[index]})
      ); */
    const valueKeys = Object.values(data).map(
        (item, index) => ({ ...item,id:keys[index] })
        );  
    console.log('data II:',valueKeys)
    //const valueKeys = Object.values(data)
    setTodos(valueKeys);
  }

  const handleUpdate = oldTodo => {
    /* Listan muutospainikkeet: listarivin arvot todo-lomaketilamuuttujaan.
       Lomakkeen avaaminen esitäytettynä. */
    //console.log('handleUpdate,oldTodo:',oldTodo);   
    //oldTodo = { ...oldTodo,['id']:id }
    console.log('handleUpdate, oldTodo:',oldTodo);   
    setTodo(oldTodo);
    setOpen(true);
    }  

  const handleClose = () => {
    setOpen(false);
    }

  const onChange = (e) => {
    /* Todo-tilamuuttujaan lisätään id-kenttä */
    const { value,name } = e.target
    setTodo({...todo, [name]:value});
    }

  const fetchItems = () => {
    fetch(url + '.json')
    .then(response => response.json())
    .then(data => addKeys(data))
    .catch(err => console.error(err))
  }

  const deleteTodo = (id) => {
    const confirm = window.confirm("Are you sure, you want to delete this row?");
    confirm && fetch(url + `${id}.json`,{
      method: 'DELETE',
      })
    .then(response => fetchItems())
    .catch(err => console.error(err))
  }

  const changeTodo = data => {
    console.log('todo:',todo,'data:',data)
    const confirm = window.confirm("Are you sure, you want to update this row?");
    confirm && fetch(url + `${todo.id}.json`,{
      method: 'PUT',
      body: JSON.stringify(data)
      })
    .then(
      response => { fetchItems();
      handleClose();
      })
    .catch(err => console.error(err))
  }

  const addTodo = (newTodo) => {
    fetch(url + '.json',{
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
      <ChangeTodo open={open} handleClose={handleClose}
        todo={todo} changeTodo={changeTodo}/> 
      <div className="ag-theme-material" style={ { height: 400, width: 800, margin: 'auto' } }>
        <AgGridReact rowData={todos}>
          <AgGridColumn sortable={true} filter={true} field='description' />
          <AgGridColumn sortable={true} filter={true} field='date' />
          <AgGridColumn sortable={true} filter={true} field='priority' />     
          <AgGridColumn 
            headerName=''
            field='id' 
            width={120}
            cellRenderer={ params => 
            <>
              <IconButton onClick={() => handleUpdate(params.data)} size="small" color="secondary">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => deleteTodo(params.value)} size="small" color="secondary">
                <DeleteIcon />
              </IconButton>
            </>
            }
          />      
          
        </AgGridReact>
      </div>
    </div>
  );
}

export default App;