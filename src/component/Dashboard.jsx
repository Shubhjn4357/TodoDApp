import { useSelector, useDispatch } from 'react-redux'
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import {Avatar, InputAdornment, Box,Card,IconButton,Stack,Typography, Button} from '@mui/material';

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
    const {list,contract}=useSelector((state)=>state.todo.value);
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

  const handlePrompt=(e)=>{
    setPrompt({
      ...Prompt,...e
    })
  }
    return (
        <>
        <Box sx={{flexGrow:1}} className='d-center'>
          <DeleteConfirmationBox open={Prompt.state} close={()=>handlePrompt({state:false})} type={Prompt.type}/>
            {list?.length>0?
            <Grid sx={{p:2}} spacing={2}>
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
                <StyledGrid sm={4}>
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
        </Box>
        </>
    )
}
export default Dashboard;