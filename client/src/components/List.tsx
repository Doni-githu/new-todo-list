
import { useContext } from "react"
import ListItem from "./ListItem"
import { TaskContext } from "../context/task"



export default function () {
    const {state} = useContext(TaskContext)
    const filtered = state.tasks.sort((a, b) => Number(a.favor) - Number(b.favor)).filter(item => state.filter === "all" ? true : item.status === state.filter)
    return (
        <ul className="todo-list flex flex-col gap-6 ">
            {filtered.map((item, index) => (
                <ListItem key={item.id} item={item} id={index} />
            ))}
        </ul>

    )
}