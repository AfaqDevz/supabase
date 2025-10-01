'use client'

import { useState } from "react"
import { supabase } from "@/supabase-client"

interface NewTaskProps {
    setNewTaskAdded: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TodoAdd({ setNewTaskAdded }: NewTaskProps) {
    const [newTask, setNewTask] = useState({ title: "", description: "" })
    const [errorMsg, setErrorMsg] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { error } = await supabase.from("tasks").insert(newTask).single();

        if (error) {
            setErrorMsg(error.message);
            return;
        }

        setNewTask({ title: "", description: "" });
        setErrorMsg(null);
        setNewTaskAdded(true);
    }
    return (
        <div className="flex justify-center">
            <div className="bg-blue-800/50 w-1/2 flex flex-col justify-center p-5 rounded-lg gap-5">
                <h1 className="text-center font-bold text-lg">Add Todo</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <input value={newTask.title} placeholder="Add a new Task Title" type="text" name="addTask" id="addTask" className="bg-black/20 p-2 rounded-lg" onChange={(e) => setNewTask((prev) => ({ ...prev, title: e.target.value }))} />
                    <textarea rows={2} value={newTask.description} placeholder="Add a new Task Description" className="bg-black/20 p-2 rounded-lg" onChange={(e) => setNewTask((prev) => ({ ...prev, description: e.target.value }))} />
                    <button className="bg-green-600 hover:bg-green-700 p-2 rounded-lg" type="submit">Add Task</button>
                </form>
                {errorMsg && <p>{errorMsg}</p>}
            </div>
        </div>
    )
}
