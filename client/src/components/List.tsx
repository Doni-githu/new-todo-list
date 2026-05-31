
import { useContext } from "react"
import ListItem from "./ListItem"
import { TaskContext } from "../context/task"


export default function () {
    const {state} = useContext(TaskContext)
    const filtered = state.tasks.sort((a, b) => Number(a.undo) - Number(b.undo))
    return (
        <ul className="todo-list flex flex-col gap-6 ">
            {filtered.map((item, index) => (
                <ListItem key={item.id} item={item} id={index} />
            ))}
        </ul>

    )
}