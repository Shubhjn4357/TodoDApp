import { createSlice } from '@reduxjs/toolkit'

export const todoHandler = createSlice({
  name: 'todo',
  initialState: {
    value:{
      account:'',
      list:null,
      contract:undefined,
      loading:false,
      newTodo:{
        id:'',
        tid:'',
        state:false,
        title:'',
        description:''
      },
      Theme:{
        checked:false,
      }
    }
  },
  reducers: {
    createNew:(state,action)=>{
      state.value.newTodo={...state.value.newTodo,...action.payload}
    },
    setContract:(state,action) => {
      state.value.contract=action.payload
    },
    setTodo: (state,action) => {
      state.value.list=action.payload
    },
    loader:(state,action)=>{
      state.value.loading=action.payload;
    },
    isConnected:(state,action)=>{
      state.value.account=action.payload
    },
    ThemeControl:(state,action)=>{
      state.value.Theme={
        checked:action.payload==='dark'?true:false
      }
      let currentTheme = document.documentElement.getAttribute("data-theme");
      let targetTheme = "light";

      if (currentTheme === "light") {
          targetTheme = "dark";
      }

      document.documentElement.setAttribute('data-theme', targetTheme)
      localStorage.setItem('theme', targetTheme);
      }
  },
})

// Action creators are generated for each case reducer function
export const {ThemeControl,setTodo,isConnected,setList,setListTitle,setContract,createNew,loader} = todoHandler.actions 

export default todoHandler.reducer