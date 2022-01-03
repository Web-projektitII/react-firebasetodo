// AddTodo.js
import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Error,InputS } from './Styled';
import { Form, Input, Button as ButtonR, 
  Modal, ModalFooter,
  ModalHeader, ModalBody } from 'reactstrap';
import { useForm } from "react-hook-form";

const initialValue = { description: '', date: '', priority: '' }

function AddTodo(props) {

  const [open, setOpen] = useState(false);
  const [openS, setOpenS] = useState(false);
  const [openR, setOpenR] = useState(false);
  const [todo, setTodo] = useState(initialValue);

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    console.log(watch("description"));
  

  const handleOpen = () => {
    setOpen(true)
    }
  const handleOpenS = () => {
    setOpenS(true)
    }
  const handleOpenR = () => {
    setOpenR(true)
    }

  const handleClose = () => {
    setOpen(false);
    setOpenS(false);
    setOpenR(false);
  }

  const handleEmpty = () => {
    reset();
    }
  
  const handleSave = () => {
    props.addTodo(todo);
    handleClose();
  }

  const handleSaveReactstrap = (data) => {
    console.log("data:",data)
    props.addTodo(data);
    handleClose();
  }


  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  }

  const inputChangedReactstrap = (event) => {
    /* Toimii: Lomakkeen tallennukseen tarvitaan todo,
       lomakkeen tarkistuksiin tarvitaan kentän reset,
       mutta korvaamalla lähetyksessä todo lomakkeen datalla,
       tämä käy tarpeettomaksi. */
    setTodo({...todo, [event.target.name]: event.target.value});
    reset({[event.target.name]:event.target.value})
  }

  var {ref, ...description} = register('description', { required: true });
  const refDescription = ref;
  var {ref, ...date} = register('date', { required: true })
  const refDate = ref;
  var {ref, ...priority} = register('priority', { required: true })
  const refPriority = ref;

  return(
    <div>
    <Grid align="right">
      <Button variant="outlined" color="primary" onClick={handleOpenS}>
        Add todo Styled
      </Button>
      <Button variant="outlined" color="primary" onClick={handleOpenR}>
        Add todo Reactstrap
      </Button>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Add todo Material-UI
      </Button>
    </Grid>

    <Dialog open={open}>
       <DialogTitle>New todo Material-UI</DialogTitle>
       <DialogContent>
       <form onSubmit={handleSubmit(handleSave)}>
         <TextField
            {...register("description", { required: true })}
            placeholder="Description"
            onChange={inputChanged}
            variant="outlined"
            margin="dense"
            fullWidth
          /> 
          {errors.description && <Error>This field is required</Error>} 
         <TextField
            {...register("date", { required: true })}
            placeholder='Date'
            onChange={inputChanged}
            variant="outlined"
            margin="dense"
            fullWidth
         />
        {errors.date && <Error>This date field is required</Error>} 
        <TextField
           {...register("priority", { required: true })}
           placeholder="Priority"
           onChange={inputChanged}
           variant="outlined"
           margin="dense"
           fullWidth
         /> 
    </form>
      </DialogContent>
      <DialogActions>
         <Button color="secondary" variant="outlined" onClick={handleEmpty}>Tyhjennä</Button>
         <Button color="secondary" variant="outlined" onClick={handleClose}>Peruuta</Button>
         <Button color="primary" variant="outlined" onClick={handleSubmit(handleSave)}>Lisää</Button>
      </DialogActions>
    </Dialog> 

    <Dialog open={openS}>
       <DialogTitle>New todo Styled</DialogTitle>
       <DialogContent>
       <form onSubmit={handleSubmit(handleSave)}>
         <InputS
            {...register("description", { required: true })}
            onChange={inputChanged}
            placeholder="Description"
          /> 
          {errors.description && <Error>Description field is required</Error>} 
         <InputS
            {...register("date", { required: true })}
            onChange={inputChanged}
            placeholder='Date'
         />
        {errors.date && <Error>Date field is required</Error>} 
        <InputS
          {...register("priority", { required: true })}
           onChange={inputChanged}
           placeholder="Priority"
        /> 
        {errors.priority && <Error>Priority field is required</Error>}     
      </form>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" variant="outlined" onClick={handleEmpty}>Tyhjennä</Button>
        <Button color="secondary" variant="outlined" onClick={handleClose}>Cancel</Button>
        <Button color="primary" variant="outlined" onClick={handleSubmit(handleSave)}>Save</Button>
      </DialogActions>
     </Dialog> 

     <Modal isOpen={openR}>
       <ModalHeader>New todo Reactstrap</ModalHeader>
       <ModalBody>
       <form onSubmit={handleSubmit(handleSave)}>
         <Input
            name="description"
            innerRef={refDescription}
            {...description}    
            placeholder="Description"
          /> 
          {errors.description && <Error>Description field is required</Error>} 
         <Input
           name="date"
           innerRef={refDate}
           {...date}
           placeholder='Date'
         />
        {errors.date && <Error>Date field is required</Error>} 
        <Input
           name="priority"
           innerRef={refPriority}
           {...priority}
           placeholder="Priority"
         /> 
         {errors.priority && <Error>Priority field is required</Error>}  
    </form>
      </ModalBody>
      <ModalFooter>
        <ButtonR color="secondary" variant="outlined" onClick={handleEmpty}>Tyhjennä</ButtonR>
        <ButtonR color="secondary" variant="outlined" onClick={handleClose}>Cancel</ButtonR>
        <ButtonR color="primary" variant="outlined" onClick={handleSubmit((data) => handleSaveReactstrap(data))}>Save</ButtonR>
      </ModalFooter>
     </Modal> 

    </div>
  );
}

export default AddTodo;