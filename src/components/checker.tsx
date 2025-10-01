"use client"

import { supabase } from "@/supabase-client";
import { useEffect, useState } from "react";
import { Auth } from "@/components/auth";
import { TodoMain } from "@/components/task-main";

export default function Checker() {
    const [session, setSession] = useState<any>("");

    const fetchSession = async () => {
        const currentSession = await supabase.auth.getSession();

        console.log(currentSession);
        setSession(currentSession);
    }

    useEffect(() => {
        fetchSession();
    }, []);
    return (
        <div>
            {session && session.data.session !== null ?
                (<TodoMain />)
                :
                (<Auth />)
            }
        </div>
    )
}
