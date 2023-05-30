import {Dialog ,Button, DialogContentText, DialogContent, DialogActions, DialogTitle} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useSelector ,useDispatch} from 'react-redux'
import { loader } from '../context/todos.context';
import {toast } from 'react-hot-toast';
const DeleteConfirmationBox=({open,close,type})=>{
  const dispatch=useDispatch()
    const {contract}=useSelector((state)=>state.todo.value);
    const callBack=async(type)=>{
        close();
        switch(type?.type){
            case 'list':
              dispatch(loader(true))
                try{
                      console.log('let do remove list')
                      await contract.removeList(type?.props.lid)
                      toast.success('Deleted SuccsFuly');
                      dispatch(loader(false))
                      window.location.reload()
                    
                    }
                  catch(err){
                    dispatch(loader(false))
                      toast.error(err.message)
                      console.log(err.message);
                  }
                  break;
            case 'todo':
              dispatch(loader(true))
                try{   
                      await contract.deleteTodo(type?.props.tid,type?.props.lid)  
                      dispatch(loader(false))                 
                      toast.success('Deleted SuccsFuly');

                      window.location.reload()
                    }
                  catch(err){
                    dispatch(loader(false))
                    toast.error(err.message)
                    console.log(err.message);
                  }
                  break;
            default:
                close();
        }
    }
    return <Dialog open={open} onClose={close}>
            <DialogTitle>
              Delete <DeleteOutlineIcon/>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are You Sure You Want To Delete
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={()=>close()}>Cancel</Button>
              <Button onClick={()=>callBack(type)}>Yes</Button>
            </DialogActions>
          </Dialog>
}
export default DeleteConfirmationBox;