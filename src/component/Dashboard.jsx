import { useSelector, useDispatch } from 'react-redux'
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import AddIcon from '@mui/icons-material/Add';
import {Avatar, InputAdornment, Box,Card,IconButton,Stack,Typography, Button} from '@mui/material';
import { StyledDrawer } from '../style/styledDrawer';
import { StyledGrid } from '../style/styledGrid';
import { StyledTextField } from '../style/styledTextfield';
import Grid from '@mui/material/Unstable_Grid2';
import { createNew,loader} from '../context/todos.context';
import {useState} from 'react';
import {toast } from 'react-hot-toast';
import DeleteConfirmationBox from './DeleteConfirmationBox';
const getRandomNumbers=()=> {
    const typedArray = new Uint8Array(10);
    const randomValues = window.crypto.getRandomValues(typedArray);
    return randomValues.join('');
  }
  const DialogInitialState={
    state:false,
    type:{
      type:'',
      props:''
    }
  }
  
const Dashboard=()=>{
    const dispatch=useDispatch();
    const {list,contract,newTodo}=useSelector((state)=>state.todo.value);
    const [Prompt,setPrompt]=useState(DialogInitialState);
    const [ListName,setListName]=useState('');
    const CreateTodo=async()=>{
        const timeSTamp=getRandomNumbers();
        dispatch(loader(true));
        try{
          await contract.addList(timeSTamp)
          toast.success('Added to list');
          dispatch(loader(false));
        }
        catch(err){
          toast.error('Invalid Transaction');
          console.log(err);
          dispatch(loader(false));
        }
    }
    const HandleFieldSet=(e)=>{
      dispatch(createNew({
        [e.target.name]:e.target.value
      }))
    }
  
    const reload=()=>{
      window.location.reload();
    }
  
    const toggleDrawer = (open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      dispatch(createNew({state:open}));
    };
    const UpdateTodo=async()=>{
      dispatch(loader(true));
        try{
            await contract.updateTodo(newTodo.tid,newTodo.id,newTodo.title,newTodo.description)
            toast.success('Updated Successfuly')
            toggleDrawer(false);
            reload()
            dispatch(loader(false));
          }
          catch(err){
            toast.error('Invalid Transaction')
            toggleDrawer(false);
            console.log(err.message);
            dispatch(loader(false));
          }
    }
    const AddTodo=async()=>{
      dispatch(loader(true));
        try{
            await contract.addTodo(newTodo.id,newTodo.title,newTodo.description);
            toast.success('Added success')
            toggleDrawer(false);
            dispatch(loader(false));
          }
          catch(err){
            toast.error('Invalid Transaction')
            toggleDrawer(false);
            console.log(err.message);
            dispatch(loader(false));
          }
    }
  const handlePrompt=(e)=>{
    setPrompt({
      ...Prompt,...e
    })
  }
  const formFieldSet=(
    <Box variant='form'
                  sx={{ width: '100%',p:2,py:4}}
                  role="presentation"
                >
                  <Button sx={{color:'var(--white)'}} onClick={()=> dispatch(createNew({state:false}))}><KeyboardBackspaceRoundedIcon/><Typography sx={{mx:2}}>{newTodo.tid?'Edit Todo':'Add Todo'}</Typography></Button>
                    <StyledTextField value={newTodo.title}                                    
                               onChange={HandleFieldSet}
                              placeholder='Carrot' 
                              name='title'  
                              sx={{my:1}}
                    />
                       <StyledTextField value={newTodo.description}                                    
                                  onChange={HandleFieldSet}
                                  name='description'
                                  sx={{ mb:1,'& .MuiInputBase-root':{
                                    height:100
                                  }}}
                                  multiline
                                  placeholder='Description:'/>

                     <Button size='small' sx={{width:'100%',borderRadius:'5rem',background:'var(--darkblue)'}} variant='contained' onClick={newTodo.tid?UpdateTodo:AddTodo}>Send</Button>
            </Box>
  )
    return (
        <>
        <Box sx={{flexGrow:1,}} className='d-center'>
          <DeleteConfirmationBox open={Prompt.state} close={()=>handlePrompt({state:false})} type={Prompt.type}/>
            {list?.length>0?
            <Grid sx={{p:2,mx:0}} container spacing={2}>
                {list?.map((item)=>{
                    return <StyledGrid md={4} sm={6} key={item.id}> 
                            <Stack spacing={2}>
                                <StyledTextField value={ListName}                                    
                                            onChange={(e)=>setListName(e.target.value)}
                                           placeholder='enter List name:'   
                                           InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    List:
                                                  </InputAdornment>
                                                ),
                                                endAdornment:(
                                                    <InputAdornment position="end">
                                                        <IconButton variant='contained' sx={{background:'var(--grey)',color:'var(--white)'}} onClick={()=>''}><EditNoteIcon/></IconButton>
                                                        <IconButton variant='contained' sx={{background:'var(--danger)',color:'var(--white)'}} onClick={()=>handlePrompt({state:true,type:{type:'list',props:{lid:item.id}}})}><DeleteOutlineIcon/></IconButton>
                                                  </InputAdornment>
                                                )
                                              }}/>
                                {item?.todos.map((i)=>{
                                    return <Card key={i.id}>
                                        <Stack direction='row' className='justify-content-between' spacing={2}>
                                            <Stack direction='row' spacing={2}>
                                                <Avatar><Person2OutlinedIcon/></Avatar>
                                                <Typography >{i.title}</Typography>
                                            </Stack>
                                            <IconButton variant='contained' sx={{background:'var(--grey)',color:'var(--white)'}} onClick={()=>dispatch(createNew({id:item.id,tid:i.id,title:i.title,description:i.description,state:true}))}><EditNoteIcon/></IconButton>
                                        </Stack>
                                        <Stack sx={{mt:1}} direction='row' className='justify-content-between' spacing={2}>
                                          <Typography variant='span'>
                                              {i.description}
                                          </Typography>
                                          <IconButton variant='contained' sx={{background:'var(--danger)',color:'var(--white)'}} onClick={()=>handlePrompt({state:true,type:{type:'todo',props:{tid:i.id,lid:item.id}}})}><DeleteOutlineIcon/></IconButton>
                                        </Stack>
                                    </Card>
                                })}
                                <Button onClick={()=> dispatch(createNew({id:item.id,tid:'',title:'',description:'',state:true}))}><AddIcon/> Add Todos</Button>
                            </Stack>
                        </StyledGrid>
                })}
                <StyledGrid md={4}>
                <StyledTextField value={''}                                    
                                        onChange={(e)=>''}
                                        disabled
                                       placeholder='enter List name:'   
                                       InputProps={{
                                            startAdornment: (
                                              <InputAdornment position="start">
                                                List:
                                              </InputAdornment>
                                            ),
                                            endAdornment:(
                                                <InputAdornment position="end">
                                                    <IconButton onClick={CreateTodo}><AddIcon/></IconButton>
                                              </InputAdornment>
                                            )
                                          }}/>
                </StyledGrid>
            </Grid>:
                <StyledGrid>
                    <Button onClick={CreateTodo}><AddIcon/>Add Todo</Button>                
                </StyledGrid>}
        <StyledDrawer
          variant="temporary"
          anchor='right'
          open={newTodo.state}
          onClose={()=>toggleDrawer(false)}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {formFieldSet}
        </StyledDrawer>
        </Box>
        </>
    )
}
export default Dashboard;