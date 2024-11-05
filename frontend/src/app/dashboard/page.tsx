'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard(){

    

    const myData = {"Email_b'5025'": {"Sender_Name": "Highire Manpower Services", "Sender_Email": "vacancy@openings.shine.com", "Subject": "Urgent Hiring for Front End Developer at Freelancer", "Response": "Here is a short summary:\n\n\"Urgent hiring for Front End Developer at Freelancer. Job posting from Highire Manpower Services (vacancy@openings.shine.com) on October 21, 2024.\""}, "Email_b'5026'": {"Sender_Name": "", "Sender_Email": "olivia@mail.nanonets.com", "Subject": "Curious About Nanonets? ", "Response": "Here is a short summary:\n\n\"Job inquiry about Nanonets from Olivia (olivia@mail.nanonets.com) on October 21, 2024.\""}, "Email_b'5027'": {"Sender_Name": "Indeed Apply", "Sender_Email": "indeedapply@indeed.com", "Subject": "Indeed Application: Data Scientist (AI Model Training & Insights)", "Response": "Here is a short summary:\n\n\"Job application for Data Scientist (AI Model Training & Insights) at Indeed Apply (indeedapply@indeed.com) on October 21, 2024.\""}, "Email_b'5028'": {"Sender_Name": "Indeed Apply", "Sender_Email": "indeedapply@indeed.com", "Subject": "Indeed Application: AI/ML Developer", "Response": "Here is the generated short summary:\n\n\"Job application for AI/ML Developer at Indeed Apply (indeedapply@indeed.com) on October 21, 2024.\""}, "Email_b'5029'": {"Sender_Name": "RITIK RAHI", "Sender_Email": "invitations@linkedin.com", "Subject": "Sahil, please add me to your LinkedIn network", "Response": "Here is a short summary:\n\nSahil Jadhav (Jr. AI Developer) has sent you an invitation to connect on LinkedIn. This email was intended for Sahil, but it appears you received an invitation to join his professional network. You can accept or decline the invitation by clicking on the provided link."}, "Email_b'5030'": {"Sender_Name": "upGrad", "Sender_Email": "alerts@admissions.upgrad.com", "Subject": "Can't wait to get ahead? Here's the program you've been looking for!", "Response": "Here is a short summary:\n\nYou have received an email from upGrad (alerts@admissions.upgrad.com) on October 21, 2024 at 7:44 AM. The subject of the email is \"Can't wait to get ahead? Here's the program you've been looking for!\"."}, "Email_b'5031'": {"Sender_Name": "Highire Manpower Services", "Sender_Email": "vacancy@openings.shine.com", "Subject": "Urgent Hiring for Customer Relation Officer at Hdfc Bank", "Response": "Here is a short summary:\n\nYou have received an email from Highire Manpower Services (vacancy@openings.shine.com) on October 21, 2024 at 1:24 PM. The subject of the email is \"Urgent Hiring for Customer Relation Officer at Hdfc Bank\"."}, "Email_b'5032'": {"Sender_Name": "Amity University", "Sender_Email": "mail@timesjobs.com", "Subject": "You are selected for MBA(Online) program with Amity University", "Response": "Here is a short summary of the content:\n\n\"You are selected for an MBA (Online) program. Click on 'Edit your details' to confirm and edit your information if needed. This email was sent by TimesJobs.com as part of their service.\""}, "Email_b'5033'": {"Sender_Name": "Amity University", "Sender_Email": "mail@timesjobs.com", "Subject": "You are selected for MBA(Online) program with Amity University", "Response": "Here is a short summary:\n\nYou have been selected for the MBA (Online) program. You are receiving this email as you are a registered user with TimesJobs.com. The link provided can be used to edit your details or unsubscribe from further emails."}, "Email_b'5034'": {"Sender_Name": "upGrad", "Sender_Email": "alerts@admissions.upgrad.com", "Subject": "Start Now ", "Response": "Here is a short summary:\n\n\"Congratulations! You have been selected for the MBA (Online) program. - upGrad <alerts@admissions.upgrad.com> on October 21, 2024 at 9:29:05 AM.\""}, "Email_b'5035'": {"Sender_Name": "LinkedIn", "Sender_Email": "jobs-listings@linkedin.com", "Subject": "Stealth Startup is hiring a Machine Learning Engineer", "Response": "Here is a short summary:\n\n**Job Opportunity:**\n\nStealth Startup is hiring a Machine Learning Engineer. This job opportunity was sent to you because you have opted-in for \"Jobs You Might Be Interested In\" emails from LinkedIn."}, "Email_b'5036'": {"Sender_Name": "Naukri", "Sender_Email": "info@naukri.com", "Subject": "Feedback on your Naukri job applies done since last week", "Response": "This appears to be an HTML email template from Naukri, a popular Indian job search platform. The email contains a table with several rows and columns, including a link to \"Security Advice\" for more information.\n\nThe main content of the email is not visible as it's encoded in a way that requires decryption to view. However, the surrounding HTML code suggests that this email may be related to a job application or job search activity on Naukri."}, "Email_b'5037'": {"Sender_Name": "Ashwini Poojari", "Sender_Email": "ashwini.poojari@datenwissen.com", "Subject": "Invitation from an unknown sender: AI - Interview  @ Tue 22 Oct 2024\r\n 5pm - 5:10pm (IST) (sahiljadhav25009@gmail.com)", "Response": "Here is a short summary:\n\nThe email is an invitation from Ashwini Poojari to an AI Interview on October 22, 2024, at 5:00-5:10 pm IST (India Standard Time - Kolkata). The interview will take place via Google Meet and also offers phone-in options. The email includes links for more information and details about the event."}}

    const myDate1 = {"Email_b'5161'": {"Sender_Name": "", "Sender_Email": "olivia@mail.nanonets.com", "Subject": "Cut Manual Data Entry by 80% Instantly, here's how!", "Response": "Here are the short summaries:\n\n1. {'subject': 'Top Jobs from Leading IT/Tech Companies like Amazon, Ola, Paytm etc', 'sender_name': 'hirist.tech', 'sender_email': 'info@hirist.tech', 'email_date': '28-Oct-2024 03:42:11', 'body': 'Please Enable Javascript'}\n\"Unlock top job opportunities from renowned IT/Tech companies like Amazon, Ola, and Paytm with Hirist.tech's exclusive list.\"\n\n2. {'subject': \"Cut Manual Data Entry by 80% Instantly, here's how!\", 'sender_name': '', 'sender_email': 'olivia@mail.nanonets.com', 'email_date': '28-Oct-2024 05:26:44'}\n\"Discover a game-changing way to automate data entry and boost productivity by 80%. Get instant access to the solution from Nanonets.\"", "Email_date": "28-Oct-2024 05:26:44"}, "Email_b'5160'": {"Sender_Name": "hirist.tech", "Sender_Email": "info@hirist.tech", "Subject": "Top Jobs from Leading IT/Tech Companies like Amazon, Ola, Paytm etc", "Response": "Here is a short summary:\n\n\"Get the latest job updates from top IT/Tech companies like Amazon, Ola, and Paytm. Stay ahead in your career with Hirist.tech's exclusive list of leading jobs.\"", "Email_date": "28-Oct-2024 03:42:11"}};

    const [summary, setSummary] = useState(null);

    useEffect(() => {
        // Ensure this code runs only on the client side
        if (typeof window !== 'undefined') {
          // Your client-side code here
          console.log("Summary variable dat\n......")
            console.log(summary)
          console.log("Hello")
         
        }
      }, [summary]);

    const fetchData = async () => {
        try {
            console.log("Into fetchData try ... fetching data!")
            const response = await axios.get('http://127.0.0.1:8000/');
            console.log(response.data);
            setSummary(response.data)
            
        }catch(error) {
            console.error("Error fetching data : ", error);
        }
    }

        return (
           <div className="relative flex bg-gray-300 h-full font-mono text-base">
                <div className=" flex-row w-1/4 bg-gray-300">
                    <div className="flex-col mx-2 my-6 px-8 py-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 hover:bg-gradient-to-r hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition duration-300 rounded-2xl shadow-xl text-gray-800 hover:cursor-pointer text-center">
                        <button onClick={fetchData}>
                              All Emails
                        </button>
                    </div>
                    <div className="flex-col mx-2 my-6 px-8 py-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 hover:bg-gradient-to-r hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition duration-300 rounded-2xl shadow-xl text-gray-800  hover:cursor-pointer text-center">
                        <button onClick={() => alert("Showing data related to Sahil")}>
                             Sahil
                        </button>
                    </div>
                    <div className="flex-col mx-2 my-6 px-8 py-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 hover:bg-gradient-to-r hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition duration-300 rounded-2xl shadow-xl text-gray-800  hover:cursor-pointer text-center">
                        <button onClick={() => alert("Showing data related to Tanay")}>
                             Tanay
                        </button>
                    </div>
                    <div className="flex-col mx-2 my-6 px-8 py-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 hover:bg-gradient-to-r hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition duration-300 rounded-2xl shadow-xl text-gray-800  hover:cursor-pointer text-center">
                        <button onClick={() => alert("Showing data related to Deep")}>
                             Deep
                        </button>
                    </div>
                    <div className="flex-col mx-2 my-6 px-8 py-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 hover:bg-gradient-to-r hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition duration-300 rounded-2xl shadow-xl text-gray-800  hover:cursor-pointer text-center">
                        <button onClick={() => alert("Showing data related to Hemant")}>
                             Hemant
                        </button>
                    </div>
                </div>

                <div className="flex-row w-3/4 text-justify ">
                
                {summary && Object.entries(summary).map(([key, value]) => (

                    <div className="relative flex-col mx-2 my-6 px-8 py-10 bg-gradient-to-r from-cyan-300 to-blue-500 rounded-2xl shadow-xl text-gray-800 right-0" key={key}>

                    
                    
                    {typeof value === 'object' && value !== null && !Array.isArray(value) ? (
                        
                        Object.entries(value).map(([key1, val]) => (
                            <div key={key1}>

                                {key1 === "Category" && (
                                    <div className="absolute top-2 right-2/4">
                                        Category : {typeof val === 'object' ? JSON.stringify(val) : val}
                                    </div>
                                )}

                                
                                {key1 === "Priority" && (
                                <div className="absolute top-2 right-64">
                                    Priority : {typeof val === 'object' ? JSON.stringify(val) : val}
                                </div>
                                )}

                                {key1 === "Email_date" && (
                                    <div className="absolute top-2 right-5">
                                        {typeof val === 'object' ? JSON.stringify(val) : val}
                                    </div>
                                )}

                                {key1 !== "Email_date" && key1 !== "Category" && key1 !== "Priority" && (
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th className="w-36 align-top">
                                                    <strong className="text-black">{key1}:</strong>
                                                </th>
                                                <td className="text-justify ">
                                                    {typeof val === 'object' ? JSON.stringify(val) : val}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                )}
                                {/* <strong className="text-black">{key1}:</strong> {typeof val === 'object' ? JSON.stringify(val) : val} */}
                            </div>
                        ))
                    ) : (
                        JSON.stringify(value)
                    )}

                </div>
                ))}
                </div>
           </div>
        );
    }

    
            
    
