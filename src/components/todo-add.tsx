"use client"

import { useState } from "react"
import { supabase } from "@/supabase-client"

export default function TodoAdd() {
    const [newTask, setNewTask] = useState({ title: "", description: "" })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { error } = await supabase.from("tasks").insert(newTask).single();

        if (error) {
            console.log("Error adding task", error.message)
        }

        setNewTask({ title: "", description: "" })
    }
    return (
        <div>
            <h1>Add Todo</h1>
            <form onSubmit={handleSubmit}>
                <input placeholder="Add a new Task Title" type="text" name="addTask" id="addTask" onChange={(e) => setNewTask((prev) => ({ ...prev, title: e.target.value }))} />
                <textarea placeholder="Add a new Task Description" onChange={(e) => setNewTask((prev) => ({ ...prev, description: e.target.value }))} />
                <button type="submit">Add Task</button>
            </form>
        </div>
    )
}
