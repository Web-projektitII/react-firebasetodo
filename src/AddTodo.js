// AddTodo.js
import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Error,InputS } from './Styled';
import { Form,Input } from 'reactstrap';
import { useForm } from "react-hook-form";


function AddTodo(props) {
  const [open, setOpen] = useState(false);
  const [todo, setTodo] = useState({description: '', date: '', priority: ''});

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  console.log(watch("description")); 
  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleSave = () => {
    props.addTodo(todo);
    handleClose();
  }

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  }

  const { ref, ...rest } = register('date', { required: true })

  return(
    <div>
    <Grid align="right">
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Add todo Styled
      </Button>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Add todo Reactstrap
      </Button>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Add todo Material-UI
      </Button>
    </Grid>
    <Dialog open={open}>
       <DialogTitle>New todo</DialogTitle>
       <DialogContent>
       <form onSubmit={handleSubmit(handleSave)}>
         <InputS
            {...register("description", { required: true })}
            onChange={inputChanged}
            placeholder="Description"
          /> 
          {errors.description && <Error>This field is required</Error>} 
         <Input
           name="date"
           {...rest} innerRef={ref}
           onChange={inputChanged}
           placeholder='Date'
         />
        {errors.date && <Error>This date field is required</Error>} 

         <TextField
           name="priority"
           value={todo.priority}
           onChange={inputChanged}
           variant="outlined"
           margin="dense"
           label="Priority"
           fullWidth
         /> 
    </form>
      </DialogContent>
      <DialogActions>
         <Button color="secondary" variant="outlined" onClick={handleClose}>Cancel</Button>
         <Button color="primary" variant="outlined" onClick={handleSubmit(handleSave)}>Save</Button>
      </DialogActions>
     </Dialog> 
    </div>
  );
}

export default AddTodo;