import type { ITaskWithOutId, TypeStatus } from "../interfaces";
import axios from "./axios";


export const TaskService = {
    getAll: () => {
        return axios.get('/')
    },
    addTask: (data: ITaskWithOutId) => {
        return axios.post("/", data)
    },
    deleteTask: (id: string) => {
        return axios.delete(`/${id}`)
    },
    editTask: (id: string, data) => {
        return axios.patch(`/${id}`, data)
    },
    changeStatus: (id: string, status: TypeStatus) => {
        return axios.patch(`/${id}`, { status })
    },
    changeFavor: (id: string, favor: boolean) => {
        return axios.put(`/favor/${id}`, { favor })
    },
    clear: (toggle: 'completed' | 'favor') => {
        return axios.delete("/clear?toggle=" + toggle)
    }
}

