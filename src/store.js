import { configureStore } from '@reduxjs/toolkit'
import todoHandler from './context/todos.context'
export default configureStore({
  reducer: {
    todo:todoHandler
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck:false
  }),
})