'use client'

import Login from "@/components/login"
import Register from "@/components/register"
import { useState } from "react"

export function Auth() {
    const [isSignUp, setIsSignUp] = useState<boolean>(false);

    return (
        <div className="flex min-h-screen flex-col justify-center items-center">
            {isSignUp ? (
                <Login />
            ) : (
                <Register />
            )}
            <p className="mt-2">
                {isSignUp ?
                    (<button type="button" className="underline" onClick={() => { setIsSignUp(false) }}>Don't got an account? Register here</button>)
                    :
                    (<button type="button" className="underline" onClick={() => { setIsSignUp(true) }}>Already got an account? Login here</button>)
                }
            </p>
        </div >
    )
}
