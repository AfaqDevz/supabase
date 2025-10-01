'use client'

import { useEffect, useState } from "react"
import { supabase } from "@/supabase-client"

interface Tasks {
    title: string;
    description: string;
    id: number;
    created_at: string;
}

interface NewTaskProps {
    newTaskAdded: boolean;
}

export default function AllTasks({ newTaskAdded }: NewTaskProps) {
    const [tasks, setTasks] = useState<Tasks[]>([])
    const [updatedTask, setUpdatedTask] = useState({ title: "", description: "" });
    const [openUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false);
    const [updateDialogID, setUpdateDialogID] = useState<number | null>(null);

    const fetchTasks = async () => {
        const { error, data } = await supabase.from("tasks").select("*").order("created_at", { ascending: true });

        if (error) {
            console.error("Error while fetching tasks", error.message);
            return
        }

        setTasks(data);
    };

    const handleUpdateTask = async () => {
        setOpenUpdateDialog(true);
    }

    const updateTask = async (id: number) => {
        const { error } = await supabase.from("tasks").update(updatedTask).eq("id", id)

        if (error) {
            console.error("Error while fetching tasks", error.message);
            return
        }

        setUpdatedTask({ title: "", description: "" });
        setOpenUpdateDialog(false);
        setUpdateDialogID(null);
        fetchTasks();
    }

    const deleteTask = async (id: number) => {
        const { error } = await supabase.from("tasks").delete().eq("id", id)

        if (error) {
            console.error("Error deleting tasks", error.message);
            return
        }

        fetchTasks();
    }

    useEffect(() => {
        fetchTasks();
    }, [newTaskAdded])

    return (
        <div className="flex justify-center">
            <div className="bg-blue-800/50 rounded-lg p-5 w-1/2 flex flex-col justify-center gap-5">
                <h1>All Tasks</h1>
                {tasks.length >= 1 ? (tasks.map((task) => (
                    <div key={task.id} className="flex flex-col items-center py-5 bg-black/20 rounded-lg">
                        <h2>{task.title}</h2>
                        <p>{task.description}</p>
                        <p className="text-xs">{new Date(task.created_at).getTime()}</p>
                        <div className="flex mt-5 gap-2">
                            <button onClick={() => { handleUpdateTask(); setUpdateDialogID(task.id); }} type="button" className="px-2 py-1 bg-orange-600 hover:bg-orange-700 rounded-lg">Edit</button>
                            <button onClick={() => { deleteTask(task.id) }} type="button" className="px-2 py-1 bg-red-600 hover:bg-red-700 rounded-lg">Delete</button>
                        </div>
                        {openUpdateDialog && updateDialogID === task.id &&
                            <div className="flex flex-col w-1/2 p-5 gap-5 rounded-2xl mt-2 bg-black/50">
                                <input value={updatedTask.title} placeholder="Add a new Task Title" type="text" name="updateTaskTitle" id="updateTaskTitle" className="bg-black/20 p-2 rounded-lg" onChange={(e) => setUpdatedTask((prev) => ({ ...prev, title: e.target.value }))} />
                                <textarea value={updatedTask.description} placeholder="Add a new Task Description" className="bg-black/20 p-2 rounded-lg" onChange={(e) => setUpdatedTask((prev) => ({ ...prev, description: e.target.value }))} />
                                <button className="bg-green-600 hover:bg-green-700 p-2 rounded-lg" onClick={() => { updateTask(task.id); }} type="button">Update Task</button>
                            </div>
                        }
                    </div>
                ))) : (<p>No tasks available</p>)}

            </div>
        </div>
    )
}
