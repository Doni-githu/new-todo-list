import { useState } from "react"
import AddForm from "./AddForm"


export default function () {
    const [isOpen, setIsOpen] = useState(false)
    

    return (
        <>
            <button onClick={() => setIsOpen(true)} className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 font-medium text-sm rounded-lg border border-slate-200 shadow-sm transition">
                <span className="text-lg font-light">+</span> New Task
            </button>

            {isOpen ? <>
                <div onClick={() => setIsOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
                    {/*  Modal Card */}
                    <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl shadow-xl w-5xl overflow-hidden transform transition-all duration-300 scale-100">

                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-slate-800">Create New Task</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-slate-400 hover:text-slate-600 rounded-lg p-1 transition"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>

                            </button>
                        </div>

                        <AddForm setIsOpen={setIsOpen} key={''}  />
                    </div>
                </div>
            </> : ""}
        </>
    )
}