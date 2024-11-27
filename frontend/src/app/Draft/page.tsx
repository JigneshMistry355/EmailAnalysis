'use client'
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

type EmailSummary = {
    subject: string;
    receiver_email: string;
    body: string;
    
};

export default function Draft(){

    const router = useRouter(); 
    const searchParams = useSearchParams();
    const data = searchParams.get('data');

    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState<string | undefined>('');

    const parsedData = data ? JSON.parse(decodeURIComponent(data)) : null;
    // console.log("First element ===> ",parsedData[0])

    useEffect(() => {
        if (parsedData) {
            console.log("Data received after drafting ====> ")
            console.log(parsedData)
            setTo(parsedData.To);
            setSubject(parsedData.Subject)
            setBody(parsedData.Body);
        }
    
    },[]) // ---> Set this empty array for initial render
    // This will allow to make changes to the text, else not
    // Handle change after that

    useEffect(() => {
        console.log(body);
        
    }, [body])
    const handleBodyChange = (event : any) => {
        setBody(event.target.value);
    }

    

    const x = {Subject: 'Boost Your Gen AI Skills: Special webinar series on Gen AI', Sender_Name: 'TechGig Webinar', To: 'expertspeak@techgig.com', Body: "Here's a formal response email body from jigneshmi…mation from my end.\n\nBest regards,\nJignesh Mistry"}

    const handleSend = async () => {
        console.log("Items to send", parsedData);
        try {
            const response = await axios.post('http://localhost:8000/send_email/', {"Sender_Name":parsedData.Sender_Name ,"Body":body, "Subject": subject, "To":to});
            console.log(response.status);
            console.log(response.data);
            alert("Email sent successfully..!")
            router.push('/dashboard')
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error:", error.response?.data);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    }

    

    

    console.log("Parsed data ==>")
    console.log(parsedData);
    // console.log(parsedData.Subject)
    // console.log(parsedData.Body)
    // console.log("###### ",parsedData.Sender_Name)

    // console.log("After set==>")
    // console.log(to);
    // console.log(subject);
    // console.log(body);

    return (
        <>
        
        <div className="relative flex bg-gray-100 h-full min-h-screen font-mono text-base">
            <div className=" flex-row w-1/4 bg-gray-100 mt-7">
                <div className="flex-col mx-1 my-2 px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-r hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition duration-300 rounded-sm shadow-xlhover:cursor-pointer text-center text-amber-300">
                    <button onClick={() => router.push('/dashboard')}>
                            Email Summarization
                    </button>
                </div>
                <div className="flex-col mx-1 my-2 px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-r hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition duration-300 rounded-sm shadow-xl hover:cursor-pointer text-center text-amber-300">
                    <button onClick={() => router.push('#')}>
                            Writing Assistance
                    </button>
                </div>
                <div className="flex-col mx-1 my-2 px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-r hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition duration-300 rounded-sm shadow-xl hover:cursor-pointer text-center text-amber-300">
                    <button onClick={() => {router.push('/DraftList')}}>
                            My Drafts
                    </button>
                </div>
                <div className="flex-col mx-1 my-2 px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-r hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition duration-300 rounded-sm shadow-xl hover:cursor-pointer text-center text-amber-300">
                    <button onClick={() => alert("Showing data related to Deep")}>
                    Usecase Y
                    </button>
                </div>
                <div className="flex-col mx-1 my-2 px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-r hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition duration-300 rounded-sm shadow-xl hover:cursor-pointer text-center text-amber-300">
                    <button onClick={() => alert("Showing data related to Hemant")}>
                    Usecase Z
                    </button>
                </div>
            </div>

            <div className="flex-row m-6 mt-9 p-3 h-fit w-3/4 text-justify bg-slate-300 rounded-md shadow-lg">
                <div className="flex flex-row m-2 p-3 w-full items-center">
                    <div className="w-1/6">
                        <label>To</label>
                    </div>
                    <div className="w-5/6">   
                        <input 
                            className="w-full border-2 px-1 border-slate-300 h-9 shadow-lg rounded-md" 
                            type="text" 
                            value={to} 
                            onChange={(e) => setTo(e.target.value)}
                            />
                    </div>
                </div>
                <div className="flex flex-row m-2 p-3 w-full items-center">
                    <div className="w-1/6 ">
                        <label>Subject</label>
                    </div>
                    <div className="flex flex-row w-5/6 ">
                        <input className="w-full border-2 px-1 border-slate-300 h-9 shadow-lg rounded-md" type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
                    </div>
                </div>
                <div className="flex flex-row m-2 p-3 w-full">
                    <div className="w-1/6 ">
                        <label>Body</label>
                    </div>
                    <div className="flex flex-row w-5/6 ">
                        <textarea className="w-full border-2 border-slate-300 h-96 shadow-lg p-4" value={body} onChange = {handleBodyChange}  rows={20}/>
                    </div>
                </div>
                <div className="flex flex-row-reverse m-2 p-3 w-full items-center">
                    
                    <div className="flex flex-row-reverse w-5/6 ">
                        <button 
                            className="bg-yellow-400 hover:bg-yellow-500 mx-3 p-2 rounded-md min-w-24 shadow-lg"
                            onClick={handleSend} >Send</button>
                    </div>
                </div>

            </div>
        </div>

        </>
    );
} 