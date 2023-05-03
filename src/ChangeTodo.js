// ChangeTodo.js

import { 
  Button, 
  TextField, 
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle } from '@mui/material';


function ChangeTodo({open,handleClose,todo,onChange,changeTodo}) {
  const {description,date,priority} = todo;
  
  return(
    <div>
     <Dialog open={open}>
       <DialogTitle>Change todo</DialogTitle>
       <DialogContent> 
         <TextField
            name="description"
            value={description}
            onChange={e=>onChange(e)}
            variant="outlined"
            margin="dense"
            label="Description"
            fullWidth
          /> 
         <TextField
           name="date"
           value={date}
           onChange={e=>onChange(e)}
           variant="outlined"
           margin="dense"
           label="Date"
           fullWidth
         /> 
         <TextField
           name="priority"
           value={priority}
           onChange={e=>onChange(e)}
           variant="outlined"
           margin="dense"
           label="Priority"
           fullWidth
         /> 
      </DialogContent>
      <DialogActions>
         <Button color="secondary" variant="outlined" onClick={handleClose}>Cancel</Button>
         <Button color="primary"variant="outlined" onClick={()=>changeTodo()}>Save</Button>
      </DialogActions>
     </Dialog> 
    </div>
  );
}

export default ChangeTodo;