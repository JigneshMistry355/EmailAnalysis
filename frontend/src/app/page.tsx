'use client'
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Home() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Ensure this code runs only on the client side
    if (typeof window !== 'undefined') {
      // Your client-side code here
    }
  }, []);

  const handleSubmit = () => {
    if (username === 'root' && password === 'pass@123') {
      console.log("Login Sucess...!");
      alert("Login Success...!");
      setPassword('');
      setUsername('');
      router.push('/dashboard');
    }
  }

  return (
    <div className="flex h-screen min-w-fit items-center justify-center bg-login-background bg-cover bg-center font-mono">
        <div className="bg-gray-200 shadow-2xl w-1/3 min-w-fit text-center items-center px-16 py-8 rounded-md justify-center">
          <h1>Login</h1>
          <div className="flex-col justify-center opacity-100 my-2">
            <div className="w-full p-0">   
              <input 
                type="text" 
                placeholder="Username" 
                name="username" 
                id="username" 
                className="border-2 border-gray-500 rounded-sm p-0.5 w-full my-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
              <input 
                type="password" 
                placeholder="Password" 
                name="password" 
                id="password" 
                className="border-2 border-gray-500 rounded-sm p-0.5 w-full my-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            
          </div>
          <div>
              <button className="rounded-sm w-full bg-gray-500 text-white px-2 py-1 hover:bg-gray-700" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    </div>
  );
}
