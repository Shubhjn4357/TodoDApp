import ShareIcon from '@mui/icons-material/Share';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import CandlestickChartOutlinedIcon from '@mui/icons-material/CandlestickChartOutlined';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import {StyledAppBar} from '../style/styledAppbar';
//import CloseIcon from '@mui/icons-material/Close';
import { Toaster,toast } from 'react-hot-toast';
//import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import {useSelector,useDispatch} from 'react-redux';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import useContract from '../hooks/useContract';
import { setTodo,isConnected ,setContract,loader,createNew,ThemeControl} from '../context/todos.context';
import { StyledDrawer } from '../style/styledDrawer';
import { Button,
  IconButton,
  Box,
  Avatar,
  CssBaseline,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  List,
  Typography,
  Stack,
  Divider,
  ListItem} from '@mui/material';
import { StyledTextField } from '../style/styledTextfield';
import { ThemeSwitch } from '../style/themeSwitch';




const Main=({component})=> {
  const {Contract,Account,Refresh}=useContract();
  const dispatch=useDispatch();
  const {newTodo,Theme,loading}=useSelector((state)=>state.todo.value);
  const [leftDrawer,setLeftDrawer]=useState(false);
  useEffect(()=>{
    dispatch(isConnected(Account[0]))
    dispatch(setContract(Contract.contract))
    const getList=async()=>{
      dispatch(loader(true))
        try{
            const list=await Contract.contract?.getTodos(Account[0]);
            dispatch(setTodo(list));
            dispatch(loader(false))
        }catch(err){
            toast.error('invalid Account')
            console.log(err)
            dispatch(loader(false))
        }
    }
    getList()
    const storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    if (storedTheme)
        document.documentElement.setAttribute('data-theme', storedTheme)
        dispatch(ThemeControl(storedTheme))

    return ()=>{
      dispatch(loader(false));
    }
  },[Contract,Account,dispatch])
   
    const HandleFieldSet=(e)=>{
      dispatch(createNew({
        [e.target.name]:e.target.value
      }))
    }
  
    const reload=()=>{
      window.location.reload();
    }
  
    const navigater=(i)=>{
        console.log(i)
    }
    const list1=[
        {text:'Home',icon:<GridViewOutlinedIcon/>,func:()=>navigater('home')},
        {text:'Section 1',icon:<AssessmentOutlinedIcon/>,func:()=>navigater('section 1')},
    ]
    const list2=[
        {text:'Section 2',icon:<CandlestickChartOutlinedIcon/>,func:()=>navigater('section 2')},
        {text:'Section 3',icon:<ShareIcon/>,func:()=>navigater('section 3')},
    ]
    const toggleDrawer = (open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      dispatch(createNew({state:open}));
    };
   
  const UpdateTodo=async()=>{
    dispatch(loader(true));
      try{
          await Contract.contract.updateTodo(newTodo.tid,newTodo.id,newTodo.title,newTodo.description)
          toast.success('Updated Successfuly')
          toggleDrawer(false);
          reload()
          dispatch(loader(false));
        }
        catch(err){
          toast.error('Invalid Transaction')
          console.log(err.message);
          dispatch(loader(false));
        }
  }
  const AddTodo=async()=>{
    dispatch(loader(true));
      try{
          await Contract.contract.addTodo(newTodo.id,newTodo.title,newTodo.description);
          toast.success('Added success')
          toggleDrawer(false);
          dispatch(loader(false));
        }
        catch(err){
          toast.error('Invalid Transaction')
          console.log(err.message);
          dispatch(loader(false));
        }
  }
  const ToggleTheme=()=>{
    if(!Theme.checked){
     dispatch(ThemeControl('dark'))
    }
    else{
     dispatch(ThemeControl('light'))
    }
  }
  const formFieldSet=(
    <Box variant='form'
                  sx={{ width: '100%',p:2,py:4}}
                  role="presentation"
                >
                  <IconButton onClick={()=> dispatch(createNew({state:false}))}><KeyboardBackspaceRoundedIcon/><Typography sx={{mx:2,color:'var(--white)'}}>{newTodo.tid?'Edit Todo':'Add Todo'}</Typography></IconButton>
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
  const drawer=(
    <Stack sx={{display:'flex',justifyContent:'space-between',height:'100%'}}>
      <Stack>
          <Toolbar>
            {Account[0]?
                <Stack spacing={2} direction='row'>
                    <Button size='small'>
                        <Avatar sx={{bgcolor:'var(--darkblue)',width:24,height:24}}>S</Avatar>
                        <Typography sx={{px:2,color:'var(--white)'}}>Shubh</Typography>
                    </Button>
                    <IconButton onClick={()=>setLeftDrawer(false)} sx={{
                        color:'var(--white)',
                        }} className='icon-line'>
                    <KeyboardBackspaceRoundedIcon/><span className='line'></span><span className='line2'></span></IconButton>
                </Stack>:
                <Button onClick={()=>Refresh(true)} size='small' variant='contained' sx={{bgcolor:'var(--darkblue)',borderRadius:'3rem'}}>Connect To Metamask</Button>
                }
            </Toolbar>
            <Divider />
            <List>
              {list1.map((item, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton onClick={item.func}>
                    <ListItemIcon>
                    {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
            {list2.map((item, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton onClick={item.func}>
                    <ListItemIcon>
                    {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            </Stack>
            <Stack direction='column' className='drawer-footer' spacing={0} >
                <Stack className='purchase-box' direction='row' spacing={1}>
                    <div className='price-box'><ChangeCircleIcon/> <Typography sx={{color:'var(--white'}}>$0.90</Typography></div>
                    <Button size='small' sx={{background:'var(--blue)',color:'var(--white)'}} className='buy-btn'>Buy $XYZ</Button>
                </Stack>
                <Stack direction='row' className='theme-box'>
                  <IconButton size='small' sx={{color:'var(--grey)'}}><LanguageIcon/></IconButton>
                  <ThemeSwitch checked={Theme.checked} onChange={()=>ToggleTheme()}/>
                </Stack>
            </Stack>
        </Stack>
  )
  return (
    <Box sx={{ display: 'flex', flexShrink: { sm: 1 } }}>
      <div className={`loader ${loading?'d-block':'d-none'}`}>
        <div className='loader-container'>
          <span></span>
          <span></span>
        </div>
      </div>
      <Toaster/>
      <CssBaseline />
      <StyledAppBar
        position="fixed" sx={{
          width: { sm: `calc(100% - ${(newTodo.state)?'500px':'250px'})` },
          ml: { sm: `250px` },
          mr:{sm:(newTodo.state)?'250px':'0'}}}>
        <Typography sx={{color:'var(--darkblue)',p:1}}>{(Account[0])?`Connected To ${Account[0]}`:'Not Conected'}</Typography>
        <Toolbar sx={{
            borderBottom:'4px solid var(--lightblack)'
        }} className='d-center justify-content-between px-5'>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={()=> setLeftDrawer(!leftDrawer)}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Link to='/' className='tab-link'>
            Section
          </Link>
          <div className='currency-box'>
            <IconButton><AccountBalanceWalletOutlinedIcon/></IconButton>
            <Typography sx={{mr:2}}>0.2 $XYZ</Typography>
            <Button size='small' variant='contained' sx={{bgcolor:'var(--skyblue)'}}>Tier 1</Button>
          </div>
        </Toolbar>
        
      </StyledAppBar>
      <StyledDrawer
          variant="temporary"
          open={leftDrawer}
          onClose={()=>setLeftDrawer(false)}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
          }}
        >
          {drawer}
        </StyledDrawer>
      <StyledDrawer
        variant="permanent"
        anchor="left"
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
        open
      >
        {drawer}
      </StyledDrawer>
      <Box
        component="main"
        sx={{ flexGrow: 0,mr:{sm:(newTodo.state)?'250px':0},background:'var(--black)',color:'var(--white)', px: 0 ,py:5,height:'100%'}}
      >
        <Toolbar ></Toolbar>
        {component}
        <StyledDrawer
          variant="persistent"
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
    </Box>
  );
}
export default Main;