import { useContext, useState } from 'react'
import { TaskContext } from '../context/task';
import type { ITask, TypeStatus } from '../interfaces';
import { TaskService } from '../service/task';
import { STATUS } from '../utils';


type SelectStatusProps = {
    task: ITask,
    styles : {
        border: string,
        select: string,
        btn: string
    }
}

export default function ({ task, styles }:SelectStatusProps) {
    const { changeStatus } = useContext(TaskContext)
    const handleStatusChange = async (id: string, newStatus: TypeStatus) => {
        await TaskService.changeStatus(id, newStatus);
        changeStatus(id, newStatus);
    };

    return (
        <div className="relative">
            <select
                value={task.status}
                onChange={(e) => handleStatusChange(task.id, e.target.value as TypeStatus)}
                className={`appearance-none pl-3 pr-8 py-1.5 rounded-md text-xs font-semibold border cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 transition-colors ${styles.select}`}
            >
                {STATUS.map(status => (
                    <option key={status} value={status} className="bg-white text-gray-800 font-normal">
                        {status}
                    </option>
                ))}
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-current opacity-70">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
    )
}
