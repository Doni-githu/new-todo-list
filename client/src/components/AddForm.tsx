import  { useContext, useState } from 'react'
import type { ITaskWithOutId } from '../interfaces'
import { TaskContext } from '../context/task'

function AddForm({ setIsOpen }) {
    const [value, setValue] = useState('')
    const { addTask } = useContext(TaskContext)
    const handleSubmit = (e) => {
        e.preventDefault()
        if(!value) {
            return alert("Title of your task is required")
        };
        const data: ITaskWithOutId = {
            title: value,
            undo: false
        }
        addTask(data)
        setValue('')
        setIsOpen(false)
    }

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
                <label htmlFor="" className="block text-sm font-medium text-slate-700 mb-1">Task Title</label>
                <input
                    type="text"
                    required
                    autoFocus
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="e.g., Write landing page"
                />
            </div>
            <div className="flex justify-end gap-3 pt-2">
                <button
                    type="button"
                    onClick={() => {
                        setIsOpen(false)
                        setValue('')
                    }}
                    className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 border border-slate-200 rounded-lg transition"
                >Cancel</button>

                <button onClick={handleSubmit} type="submit" className="px-4 text-white py-2 text-sm font-medium text-slate-600 bg-blue-600 hover:bg-blue-700 shadow-sm border border-slate-200 rounded-lg transition">
                    Submit
                </button>
            </div>
        </form>
    )
}

export default AddForm