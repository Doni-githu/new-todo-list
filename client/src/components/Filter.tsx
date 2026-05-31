import { STATUS } from '../utils'
import type { TypeStatus } from '../interfaces';
import { useContext, useEffect, useState } from 'react';
import { TaskContext } from '../context/task';
import { useLocation, useSearchParams } from 'react-router';

type FilterStatus = 'all' | TypeStatus

const getStatusClasses = (status: FilterStatus) => {
    switch (status) {
        case 'all': 
            return {
                border: 'border-l-gray-300',
                select: 'bg-white',
                active: 'opacity-60',
                btn: 'rounded-md rounded-r-none bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500'
            };
        case 'to-do':
            return {
                border: 'border-l-amber-500',
                select: 'bg-amber-100 text-amber-800 border-amber-300 focus:ring-amber-500',
                btn: 'rounded-none bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-500',
                active: 'opacity-60',
            };
        case 'progress':
            return {
                border: 'border-l-blue-500',
                select: 'bg-blue-100 text-blue-800 border-blue-300 focus:ring-blue-500',
                btn: 'rounded-none bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
                active: 'opacity-60',
            };
        case 'completed':
            return {
                border: 'border-l-emerald-500',
                active: 'opacity-60',
                select: 'bg-emerald-100 text-emerald-800 border-emerald-300 focus:ring-emerald-700',
                btn: 'rounded-md rounded-l-none bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-700'
            };
        
        default:
            return { border: 'border-l-gray-300', select: 'bg-white', btn: 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500' };
    }
};


function Filter() {
    const newSTATSUS: FilterStatus[] = ["all", ...STATUS]
    const {changeFilter, state} = useContext(TaskContext)
    const [searchParams, setSearchParams] = useSearchParams()
    useEffect(() => {
        const filter = searchParams.get('filter') as FilterStatus
        if (filter) {
            changeFilter(filter)
        }
    }, [])
    const handleFilter = (status: FilterStatus) => {    
        setSearchParams({ filter: status })
        changeFilter(status)
    }

    return (
        <div className="inline-flex rounded-md shadow-sm mb-5" role="group">
            {newSTATSUS.map(status => {
                const styles = getStatusClasses(status)
                return (
                    <button key={status} onClick={() => handleFilter(status)} disabled={state.filter === status} type="button" className={`px-4 py-2 ${state.filter === status ? styles.active : ''} text-sm font-medium text-white ${styles.btn} ${styles.border}`}>
                        {status.at(0).toUpperCase() + status.slice(1)}
                    </button>
                )
            })}
        </div>
    )
}

export default Filter