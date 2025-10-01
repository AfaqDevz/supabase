'use client'

import TodoAdd from "@/components/task-add"
import AllTasks from "@/components/all-tasks"
import { supabase } from "@/supabase-client";
import { useState } from "react";

export function TodoMain() {
    const [newTaskAdded, setNewTaskAdded] = useState<boolean>(false);

    const logout = async () => {
        await supabase.auth.signOut();


    }
    return (
        <div className="space-y-5 min-h-screen flex flex-col justify-center">
            <div className="bg-black/20 w-full h-20 fixed top-0">
                <button type="button" className="absolute right-5 p-3 rounded-lg bg-red-600 hover:bg-red-800" onClick={() => logout()}>Logout</button>
            </div>
            <TodoAdd setNewTaskAdded={setNewTaskAdded} />
            <AllTasks newTaskAdded={newTaskAdded} />
        </div>
    )
}
