import { createContext, useReducer, type ReactNode } from "react";
import type { ITaskWithOutId, TypeDefaultValue, TypeTaskAction } from "../interfaces";


type TaskContextType = {
    state: TypeDefaultValue;
    dispatch: React.Dispatch<TypeTaskAction>;
    changeUndo: (id: number) => void;
    addTask: (data: ITaskWithOutId) => void;
    deleteTask: (id: number) => void;
    editTask: (id: number, title: string) => void
};
const defaultValue: TypeDefaultValue = {
    tasks: [
        {
            id: 1,
            title: 'Buy groceries',
            undo: false
        }
    ]
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined)

const reducer = (state: TypeDefaultValue, action: TypeTaskAction) => {
    switch (action.type) {
        case 'added':
            return { ...state, tasks: [...state.tasks, action.payload] }
        case 'rewrited':
            const title = action.payload.title
            const newTasks = state.tasks.map((item) => {
                if (item.id === action.payload.id) {
                    return { ...item, title: title }
                }
                return item
            })
            return { ...state, tasks: newTasks }
        case 'deleted':
            const id = action.payload.id
            return { ...state, tasks: state.tasks.filter(item => item.id !== id) }
        case 'undo':
            state.tasks.map(item => {
                if (item.id == action.payload.id) {
                    return {
                        ...item,
                        undo: !item.undo
                    }
                }
            })
            return { ...state, }
        default:
            return state
    }
}

type ContextProviderProps = {
    children: ReactNode,
};

const TaskProvider = ({ children }: ContextProviderProps) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);

    const changeUndo = (id: number) => {
        dispatch({
            type: 'undo',
            payload: { id }
        })
    }

    const addTask = (data: ITaskWithOutId) => {
        dispatch({
            type: 'added',
            payload: {
                ...data,
                id: state.tasks.at(-1).id + 1
            }
        })
    }

    const deleteTask = (id: number) => {
        dispatch({
            type: 'deleted',
            payload: { id }
        })
    }

    const editTask = (id: number, title: string) => {
        dispatch({
            type:'rewrited',
            payload: {
                id,
                title
            }
        })
    }

    return (
        <TaskContext.Provider value={{ state, dispatch, changeUndo, addTask, deleteTask, editTask }}> {children} </TaskContext.Provider>
    );
}

export default TaskProvider