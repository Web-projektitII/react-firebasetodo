// ChangeTodo.js
import { useEffect } from 'react';
import { 
  Button, 
  TextField,
  Input, 
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle } from '@mui/material';
import { Error } from './Styled';
import { useForm } from "react-hook-form";


function ChangeTodo({open,handleClose,todo,changeTodo}) {
  const {description,date,priority,id} = todo;
  
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  let initialValue = {description,date,priority,id}
  console.log(watch("description"));

  useEffect(() => {
    console.log('useEffect,todo:',todo)
    reset(initialValue) 
    }, [todo]);

  const handleReset = () => {
    console.log("handleReset")
    reset({description:'',date:'',priority:'',id})
    }

  const handleRecover = () => {
    console.log("handleRecover")
    reset(initialValue)
    }  

  return(
    <div>
     <Dialog open={open}>
       <DialogTitle>Change todo</DialogTitle>
       <DialogContent> 
         <form onSubmit={handleSubmit(data => changeTodo(data))} >
         <TextField
            {...register("description", { required: true })}
            variant="outlined"
            margin="dense"
            label="Description"
            fullWidth
          /> 
         {errors.description && <Error>Täytä kuvaus</Error>} 
         <TextField
           {...register("date", { required: true })}
           variant="outlined"
           margin="dense"
           label="Date"
           fullWidth
         /> 
         {errors.date && <Error>Lisää päivämäärä ja aika</Error>} 
         <TextField
           {...register("priority", { required: true })}
           variant="outlined"
           margin="dense"
           label="Priority"
           fullWidth
         /> 
         {errors.priority && <Error>Lisää kiireellisyys</Error>} 
         <DialogActions>
         <Button color="secondary" variant="outlined" onClick={handleReset}>Tyhjennä</Button>
         <Button color="secondary" variant="outlined" onClick={handleClose}>Peruuta</Button>
         <Button color="secondary" variant="outlined" onClick={handleRecover}>Palauta</Button>
          <Button type="submit" value="Tallenna" color="primary" variant="outlined">Tallenna</Button>
         </DialogActions>     
      </form>   
      </DialogContent>
    </Dialog> 
    </div>
  );
}

export default ChangeTodo;