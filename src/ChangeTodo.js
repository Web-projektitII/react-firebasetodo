// ChangeTodo.js

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


function ChangeTodo({open,handleClose,todo,onChange,changeTodo}) {
  const {description,date,priority} = todo;
  
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  console.log(watch("description"));

  return(
    <div>
     <Dialog open={open}>
       <DialogTitle>Change todo</DialogTitle>
       <DialogContent> 
         <form onSubmit={handleSubmit(changeTodo)} >
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
         <Button color="secondary" variant="outlined" onClick={handleClose}>Peruuta</Button>
         <Button type="submit" value="Tallenna" color="primary" variant="outlined">Tallenna</Button>
         </DialogActions>     
      </form>   
      </DialogContent>
    </Dialog> 
    </div>
  );
}

export default ChangeTodo;