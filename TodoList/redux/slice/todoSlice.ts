import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Todo {
  id: number;
  text: string;
  isDone: boolean;
}

interface InitialState {
  currentId: number;
  todos: Todo[];
}

const initialState: InitialState = {
  currentId: 4,
  todos: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: ({ todos, currentId }, action: PayloadAction<{ text: string }>) => {
      todos.push({
        id: currentId++,
        text: action.payload.text.trim(),
        isDone: false,
      });
    },
    updateTodo: ({ todos }, action: PayloadAction<{ id: number }>) => {
      const index = findId(todos, action.payload.id);
      if (index === -1) {
        return;
      }
      const currentTodo = todos.splice(index, 1)[0];
      currentTodo.isDone = !currentTodo.isDone;
      todos.push(currentTodo);
    },
    deleteTodo: ({ todos }, action: PayloadAction<{ id: number }>) => {
      const index = findId(todos, action.payload.id);
      if (index === -1) {
        return;
      }
      todos.splice(index, 1);
    },
  },
});

const findId = (todos: Todo[], id: number) => todos.findIndex(todo => todo.id === id);

export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
