import type { TypeStatus } from "./interfaces";

export const STATUS: TypeStatus[] = ["to-do", "progress", "completed"];

export const getStatusClasses = (status: TypeStatus) => {
    switch (status) {
        case 'to-do':
            return {
                border: 'border-l-amber-500',
                select: 'bg-amber-100 text-amber-800 border-amber-300 focus:ring-amber-500', 
                btn: 'rounded-md rounded-r-none bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-500'
            };
        case 'progress':
            return {
                border: 'border-l-blue-500',
                select: 'bg-blue-100 text-blue-800 border-blue-300 focus:ring-blue-500',
                btn: 'rounded-none bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500'
            };
        case 'completed':
            return {
                border: 'border-l-emerald-500',
                select: 'bg-emerald-100 text-emerald-800 border-emerald-300 focus:ring-emerald-700',
                btn: 'rounded-md rounded-l-none bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-700'
            };
        default:
            return { border: 'border-l-gray-300', select: 'bg-white', btn: 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500' };
    }
};
