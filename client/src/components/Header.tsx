import TaskManager from "./TaskManager";

export default function () {
    return (
        <div className="todo-header flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-10">
            <h1 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight">
                My Daily Tasks
            </h1>
            <TaskManager />
        </div>
    )
}