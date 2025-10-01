import { supabase } from '@/supabase-client';
import { useState } from 'react'

export default function Register() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { error: signUpError } = await supabase.auth.signUp({ email, password });

        if (signUpError) {
            console.warn("ERROR IN SIGNUP", signUpError.message);
            return
        }

        const { error: userTableError } = await supabase.from("users").insert({ name, email }).single();

        if (userTableError) {
            console.warn("ERROR IN USER TABLE:", userTableError.message)
        }
    }
    return (
        <div className='flex flex-col gap-3 w-1/4 bg-black/20 p-5 rounded-lg'>
            <h1>Register</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                <input placeholder='name' value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" className='p-2 bg-black/20' />
                <input placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" id="email" className='p-2 bg-black/20' />
                <div className='relative flex items-center'>
                    <input className='p-2 bg-black/20 w-full' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} type={`${showPassword ? ("text") : ("password")}`} name="password" id="password" />
                    <button type='button' className='absolute right-2' onClick={() => { showPassword ? (setShowPassword(false)) : (setShowPassword(true)) }}>{showPassword ? ("Hide") : ("Show")}</button>
                </div>
                <button type="submit" className='p-1 bg-green-600 hover:bg-green-700 rounded-lg'>Register</button>
            </form>
        </div>
    )
}
