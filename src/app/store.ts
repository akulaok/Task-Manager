import { configureStore } from '@reduxjs/toolkit'
import taskReducer from '../entities/task/model/taskSlice'
import modalReducer from '../features/modal/model/modalSlice'

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    modal: modalReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
