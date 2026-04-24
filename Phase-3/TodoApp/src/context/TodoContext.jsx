import { createContext,useContext } from "react";

// export const TodoContext = createContext();
export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            todo: "Learn React",
            isCompleted: false,
        },
    ],
    addTodo: () => {},
    updatedTodo: () => {},
    deleteTodo: () => {},
    toggleComplete: () => {},
});

export const useTodo = () =>{
    return useContext(TodoContext);
}

export const TodoProvider = TodoContext.Provider;