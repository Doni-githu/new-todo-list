import { useContext, useState } from "react"
import trash from "../assests/trash-solid-full.svg"
import type { ITask } from "../interfaces"
import { FaPen, FaTimes,FaTrash } from "react-icons/fa";
import { TaskContext } from "../context/task"
import { TaskService } from "../service/task"

export default function ({ item, id }: { item: ITask, id: number }) {
    const { deleteTask, editTask } = useContext(TaskContext)
    const [isOpen, setIsOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [title, setTitle] = useState(item.title)


    const handleDelete = async (e) => {
        try {
            e.preventDefault()

            await TaskService.deleteTask(item.id)
            deleteTask(item.id)
        } catch (err) {
            console.log("in deleting error", err)
        } finally {
            setIsOpen(false)
        }
    }

    const handleEdit = async (e) => {
        try {
            e.preventDefault()
            await TaskService.editTask(item.id, { title })
            editTask(item.id, title)
        } catch (error) {
            console.log("In editing happened", error)
        } finally {
            setIsEdit(false)
        }
    }

    return (
        <li className="flex sm:flex-row flex-col  justify-between items-start sm:items-center p-6 bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] gap-4">
            {/* Left side */}
            <div className="w-full sm:w-auto">
                <div className="flex items-center gap-3">
                    <span onClick={(e) => e.stopPropagation()} className="text-xs font-semibold text-slate-400 tracking-winder">#{id + 1}</span>
                    {isEdit ?
                        <>
                            <form onSubmit={handleEdit} action="">
                                <input type="text" className="text-lg font-medium text-slate-700 border border-slate-700" value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
                            </form>
                        </> :
                        <p className={`text-lg cursor-pointer font-medium ${item.favor ? 'text-slate-300 line-through' : 'text-slate-700'}`}>{item.title}</p>}
                </div>
            </div>
            {/* right side */}
            <div className="flex flex-row sm:flex-col items-center sm:items-emd justify-between sm:justify-start w-full sm:w-auto gap-3">
                {/* <div className="relative">
                        <select
                            name="select"
                            id="IdStatus"
                            value={item.status}
                            onChange={(e) => console.log(e.target.value)}
                            className="appearance-none bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-1.5 px-4 rounded-full shadow-sm cursor-pointer transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-"
                        >
                            <option value="in-progress" className="bg-blue-600 text-slate-800">In Progress</option>
                            <option value="to-do" className="bg-yellow-200 text-slate-800">To-Do</option>
                            <option value="in-progress" className="bg-green-700 text-white text-slate-800">Completed</option>
                        </select>
                    </div> */}
                <div className="flex items-center gap-2">


                    <button
                        onClick={() => setIsEdit(!isEdit)}
                        className="relative flex h-10 w-10 items-center justify-center rounded-md bg-green-500 text-white"
                    >
                        <FaPen
                            className={`absolute transition-all duration-300 ${isEdit
                                    ? "rotate-90 scale-0 opacity-0"
                                    : "rotate-0 scale-100 opacity-100"
                                }`}
                        />

                        <FaTimes
                            className={`absolute transition-all duration-300 ${isEdit
                                    ? "rotate-0 scale-100 opacity-100"
                                    : "-rotate-90 scale-0 opacity-0"
                                }`}
                        />
                    </button>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="relative flex h-10 w-10 items-center justify-center rounded-md bg-red-500 text-white"
                    >
                        <FaTrash
                            className={`absolute rotate-0 scale-100 opacity-100 transition-all duration-300`}
                        />
                    </button>
                    {/* <button onClick={() => setIsEdit((state) => !state)} className="p-2 bg-green-500 hover:bg-slate-100 rounded-lg border border-slate-700 shadow-sm  transition group" title="Edit Task">
                        <img src={edit} alt="Edit" className="w-4 h-4 opacity-60 group-hover:opacity-100 transition" />
                    </button> */}
                    {/* <button onClick={() => setIsOpen(true)} className="p-2 bg-red-500 hover:bg-slate-100 rounded-lg border border-slate-700 shadow-sm  transition group" title="Edit Task">
                        <img src={trash} alt="Delete" className="w-4 h-4 opacity-60 group-hover:opacity-100 transition" />
                    </button> */}

                </div>


                {isOpen ? <>
                    <div onClick={() => setIsOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
                        {/*  Modal Card */}
                        <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl shadow-xl w-auto overflow-hidden transform transition-all duration-300 scale-100">

                            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-slate-800 mr-5">Delete a Task</h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-slate-400 hover:text-slate-600 rounded-lg p-1 ml-5 transition"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>

                                </button>
                            </div>
                            <form onSubmit={handleDelete} className="p-6 space-y-4">
                                <p className="text-lg">Are you sure.</p>
                                <div className="flex gap-5">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsOpen(false)
                                        }}
                                        className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 border border-slate-200 rounded-lg transition"
                                    >Cancel</button>
                                    <button type="submit" className="px-4 text-white py-2 text-sm font-medium text-slate-600 bg-red-600 hover:bg-red-700 shadow-sm border border-slate-200 rounded-lg transition">
                                        Delete
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </> : ""}
            </div>
        </li>
    )
}