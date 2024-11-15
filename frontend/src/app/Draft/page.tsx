'use client'
import { useRouter } from "next/navigation";

export default function Draft(){

    const router = useRouter();


    return (
        <>
        
        <div className="relative flex bg-gray-100 h-full min-h-screen font-mono text-base">
            <div className=" flex-row w-1/4 bg-gray-100">
                <div className="flex-col mx-2 my-6 px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-r hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition duration-300 rounded-2xl shadow-xlhover:cursor-pointer text-center text-amber-300">
                    <button onClick={() => router.push('/dashboard')}>
                            Email Summarization
                    </button>
                </div>
                <div className="flex-col mx-2 my-6 px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-r hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition duration-300 rounded-2xl shadow-xl hover:cursor-pointer text-center text-amber-300">
                    <button onClick={() => alert("Showing data related to Tanay")}>
                            Sentiment Analysis
                    </button>
                </div>
                <div className="flex-col mx-2 my-6 px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-r hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition duration-300 rounded-2xl shadow-xl hover:cursor-pointer text-center text-amber-300">
                    <button onClick={() => router.push('#')}>
                            Writing Assistance
                    </button>
                </div>
                <div className="flex-col mx-2 my-6 px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-r hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition duration-300 rounded-2xl shadow-xl hover:cursor-pointer text-center text-amber-300">
                    <button onClick={() => alert("Showing data related to Deep")}>
                            Analytics and Report
                    </button>
                </div>
                <div className="flex-col mx-2 my-6 px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-r hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition duration-300 rounded-2xl shadow-xl hover:cursor-pointer text-center text-amber-300">
                    <button onClick={() => alert("Showing data related to Hemant")}>
                            Knowledge Management
                    </button>
                </div>
            </div>

            <div className="flex-row m-6 p-3 h-fit w-full text-justify bg-slate-300 rounded-lg shadow-lg">
                <div className="flex flex-row m-2 p-3 w-full items-center">
                    <div className="w-1/6">
                        <label>To</label>
                    </div>
                    <div className="w-5/6">   
                        <input className="w-full border-2 px-1 border-slate-300 h-9 shadow-lg rounded-md" type="text" />
                    </div>
                </div>
                <div className="flex flex-row m-2 p-3 w-full items-center">
                    <div className="w-1/6 ">
                        <label>Subject</label>
                    </div>
                    <div className="flex flex-row w-5/6 ">
                        <input className="w-full border-2 px-1 border-slate-300 h-9 shadow-lg rounded-md" type="text" />
                    </div>
                </div>
                <div className="flex flex-row m-2 p-3 w-full">
                    <div className="w-1/6 ">
                        <label>Body</label>
                    </div>
                    <div className="flex flex-row w-5/6 ">
                        <textarea className="w-full border-2 border-slate-300 h-96 shadow-lg"  rows={20}/>
                    </div>
                </div>
                <div className="flex flex-row-reverse m-2 p-3 w-full items-center">
                    
                    <div className="flex flex-row-reverse w-5/6 ">
                        <button className="bg-yellow-400 hover:bg-yellow-500 mx-3 p-2 rounded-md min-w-24 shadow-lg" >Send</button>
                    </div>
                </div>

            </div>
        </div>

        </>
    );
} 