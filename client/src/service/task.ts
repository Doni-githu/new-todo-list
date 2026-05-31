import type { ITaskWithOutId } from "../interfaces";
import axios from "./axios";


export const TaskService = {
    getAll: () => {
        return axios.get('/')
    },
    addTask: (data:ITaskWithOutId) => {
        return axios.post("/", data)
    },
    deleteTask: (id: string) => {
        return axios.delete(`/${id}`)
    },
    editTask: (id: string,data) => {
        return axios.patch(`/${id}`, data)
    }
}

