import { createContext, useReducer, type ReactNode } from "react";
import type { ITask, ITaskWithOutId, TypeDefaultValue, TypeTaskAction } from "../interfaces";


type TaskContextType = {
    state: TypeDefaultValue;
    dispatch: React.Dispatch<TypeTaskAction>;
    changeUndo: (id: string) => void;
    addTask: (data: ITaskWithOutId) => void;
    deleteTask: (id: string) => void;
    editTask: (id: string, title: string) => void;
    loadTasks: (tasks: ITask[]) => void
};
const defaultValue: TypeDefaultValue = {
    tasks: []
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
                    console.log(item)
                    return { ...item, title: title }
                }
                console.log(item)
                return item
            })
            return { ...state, tasks: newTasks }
        case 'deleted':
            const id = action.payload.id
            return { ...state, tasks: state.tasks.filter(item => item.id !== id) }
        case 'favor':
            state.tasks.map(item => {
                if (item.id == action.payload.id) {
                    return {
                        ...item,
                        undo: !item.favor
                    }
                }
            })
            return { ...state, }
        case 'initial_tasks':
            return { ...state, tasks: [...action.payload] }
        default:
            return state
    }
}

type ContextProviderProps = {
    children: ReactNode,
};

const TaskProvider = ({ children }: ContextProviderProps) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);

    const changeUndo = (id: string) => {
        dispatch({
            type: 'favor',
            payload: { id }
        })
    }

    const addTask = (data: ITask) => {
        dispatch({
            type: 'added',
            payload: data
        })
    }

    const deleteTask = (id: string) => {
        dispatch({
            type: 'deleted',
            payload: { id }
        })
    }

    const editTask = (id: string, title: string) => {
        dispatch({
            type: 'rewrited',
            payload: {
                id,
                title
            }
        })
    }

    const loadTasks = (tasks: ITask[]) => {
        dispatch({
            type: 'initial_tasks',
            payload: tasks
        })
    }

    return (
        <TaskContext.Provider value={{ state, dispatch, changeUndo, addTask, deleteTask, editTask, loadTasks }}>
            {children}
        </TaskContext.Provider>
    );
}

export default TaskProvider