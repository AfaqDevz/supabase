import { supabase } from '@/supabase-client';
import { useState } from 'react'

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (email !== undefined && password !== undefined) {
            const { error } = await supabase.auth.signInWithPassword({ email, password });

            if (error) {
                console.warn("ERROR IN SIGNIN", error.message);
                return
            }
        }
    }
    return (
        <div className='flex flex-col p-5 w-1/4 rounded-lg gap-3 bg-black/50'>
            <h1 className='font-bold text-center'>Login</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3 justify-center'>
                <input placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" id="email" className='bg-black/50 p-2 rounded-lg' />
                <input placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" className='bg-black/50 p-2 rounded-lg' />
                <button type="submit" className='p-1 bg-green-600 hover:bg-green-700 rounded-lg'>Login</button>
            </form>
        </div>
    )
}
