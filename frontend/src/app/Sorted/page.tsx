'use client'
import { table } from "console";
import React, { useState, useEffect } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export default function SortedDashboard() {
    
    const emails = [
        
        {
            "Sender_Name": "Swiggy",
            "Sender_Email": "no-reply@swiggy.in",
            "Subject": "You’re not ready for this... 🤫",
            "Response": "It looks like you'd like me to assist with creating templates or scripts for processing email content.\n\nTo confirm, you'd like me to help with:\n\n1. Creating a template/script for extracting specific information from emails?\n2. Automating tasks related to email processing (e.g., filtering, sorting, or categorizing emails)?\n3. Developing a script for sending automated responses or notifications based on certain conditions?\n\nPlease let me know your requirements, and I'll do my best to assist you!\n\nAs for the last email:\n\nThe Swiggy team is teasing the recipient with a playful message.\n\nHere are the summaries of all the emails so far:\n\n1. The first email from LinkedIn is about a confirmed profile.\n2. The second email from InnovaEdge Consultancy is about a shortlisted profile.\n3. The third email from hrist.tech (not sure if it's correct, but I assume it's hirist.tech) is about top job opportunities at leading IT/Tech companies.\n4. The fourth email from Career in Cyber Security is promoting a postgraduate program in cybersecurity.\n5. The fifth email from Indeed is asking the recipient to confirm their interest in a quick message to Makebot.\n6. The sixth email from The SingleStore Team is inviting the recipient to set up their account.\n7. The seventh email from upGrad is promoting a career advancement program.\n8. The eighth email from Swiggy is sending a playful message.\n\nLet me know if you'd like me to summarize any other emails!\n\nNow, let's get started on creating those templates or scripts for processing email content! Which one would you like to start with?",
            "Email_date": "08-Nov-2024 12:37:13",
            "Category": "Template/Script Creation",
            "Priority": "medium"
        }
    ]




    return (

        <div className="relative flex bg-gray-300 h-full min-h-screen font-mono text-base">
            <div className=" flex-row w-1/4 bg-gray-300">
                    <div className="flex-col mx-2 my-6 px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-r hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition duration-300 rounded-2xl shadow-xlhover:cursor-pointer text-center text-amber-300">
                        <button onClick={() => alert("fdf")}>
                              Email Summarization
                        </button>
                    </div>
                    <div className="flex-col mx-2 my-6 px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-r hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition duration-300 rounded-2xl shadow-xl hover:cursor-pointer text-center text-amber-300">
                        <button onClick={() => alert("dfdf")}>
                             Sentiment Analysis
                        </button>
                    </div>
                    <div className="flex-col mx-2 my-6 px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-r hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition duration-300 rounded-2xl shadow-xl hover:cursor-pointer text-center text-amber-300">
                        <button onClick={() => alert("Showing data related to Tanay")}>
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



                <div className="flex-row w-3/4 text-justify  ">

                    <div>
                        <label className="relative inline-block w-16 h-8">
                            <input type="checkbox" className="opacity-0 w-0 h-0 peer" />
                            
                        
                            <span className="absolute inset-0 bg-slate-500 rounded-full cursor-pointer transition-colors peer-checked:bg-blue-500"></span>
                            
                        
                            <span className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform transform peer-checked:translate-x-8"></span>
                        </label>
                    </div>

                    <div className="relative inline-block z-0">
                        <button className="bg-slate-100 text-gray-600 p-2 pointer hover:bg-slate-200">Sort by</button> 
                        <div className="hidden absolute min-w-10 z-10">
                            <button className="text-black p-2 block">Category</button>
                            <button>Priority</button>
                            <button>Date</button>
                        </div>
                    </div>

                    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Options
          <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
            >
              Account settings
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
            >
              Support
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
            >
              License
            </a>
          </MenuItem>
          <form action="#" method="POST">
            <MenuItem>
              <button
                type="submit"
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
              >
                Sign out
              </button>
            </MenuItem>
          </form>
        </div>
      </MenuItems>
    </Menu>
                
                    {emails.map((item, index) => (
                        <div className="relative flex-col mx-2 my-6 px-8 py-10 bg-gradient-to-r from-cyan-300 to-blue-500 rounded-2xl shadow-xl text-gray-800 right-0 contain-inline-size text-nowrap">
                           
                                    {Object.entries(item).map(([key, val]) => (
                                        <div key={key}>
                                            {key === "Category" && (
                                                <div className="absolute top-2 right-2/4 text-ellipsis overflow-hidden">
                                                    Category : {typeof val === 'object' ? JSON.stringify(val) : val}
                                                </div>
                                            )}

                                            {key === "Priority" && (
                                                <div className="absolute top-2 right-64 text-ellipsis overflow-hidden">
                                                    Priority : {typeof val === 'object' ? JSON.stringify(val) : val}
                                                </div>
                                            )}

                                            {key === "Email_date" && (
                                                <div className="absolute top-2 right-5 text-ellipsis overflow-hidden">
                                                    {typeof val === 'object' ? JSON.stringify(val) : val}
                                                </div>
                                            )}

                                            { key !=="Email_date" && key !== "Category" && key !== "Priority" && (
                                            <table key={index}>
                                                <tbody>
                                                    <tr key={key}>
                                                        <th className="w-36 align-top">
                                                            <strong className="text-black">{key} : </strong>
                                                        </th>
                                                        <td className="text-justify inline text-wrap">
                                                            {typeof val === 'object' ? JSON.stringify(val) : val}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            )}
                                        </div>
                                    ))}
                                
                        </div>
                    ))}
                
                </div>
            </div>
    );
}