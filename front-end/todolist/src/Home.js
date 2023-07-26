import { Fragment, useEffect, useState } from "react"
import axios from 'axios';
import add from "./assets/add.png";
import done from "./assets/done.png";
import bin from "./assets/bin.png";

function Home() {
    const [description, setDescription] = useState('');
    const [isCompleted, setIsCompleted] = useState('');
    const [deleted, setDeleted] = useState('');
    const [todo, setTodo] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    useEffect(() => {
        async function getData() {
            const data = await axios.get('http://127.0.0.1:4242/');
            console.log(data);
            setTodo(data.data);
        }
        getData();
    }, []);

    async function submit(e) {
        e.preventDefault();
        try {
            const data = await axios.post('http://localhost:4242/', {
                description,
                isCompleted,
                deleted
            })
            setTodo([...todo, data.data[0]]);
        } catch (e) {
            console.log(e);
        }
    }

    async function deleteTask(id) {
        try {
            await axios.delete(`http://localhost:4242/todo/${id}`);
            const updatedTodo = todo.filter((item) => item._id !== id);
            setTodo(updatedTodo);
        } catch (e) {
            console.log(e);
        }
    }

    function handleDeleteTask(id) {
        deleteTask(id);
    }

    async function markTaskAsDone(id) {
        try {
            await axios.put(`http://localhost:4242/todo/${id}`, {
                isCompleted: true,
            });

            const updatedTodo = todo.filter((item) => item._id !== id);
            const completedTask = todo.find((item) => item._id === id);
            setTodo(updatedTodo);
            setCompletedTasks([...completedTasks, completedTask]);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        async function getData() {
            const data = await axios.get('http://127.0.0.1:4242/');
            const allTasks = data.data;
            const completed = allTasks.filter((item) => item.isCompleted);
            const notCompleted = allTasks.filter((item) => !item.isCompleted);
            setTodo(notCompleted);
            setCompletedTasks(completed);
        }
        getData();
    }, []);
    return (
        <div className="">
            <form action="POST">
                <div className="flex border border-indigo-900 bg-transparent w-3/12 rounded-lg items-center justify-center m-auto mt-20">
                    <label htmlFor="description"></label>
                    <input type="text" name="description" onChange={(e) => { setDescription(e.target.value) }} id="description" className="w-10/12 pl-10 text-slate-400 text-sm rounded-lg block p-2.5 dark:bg-transparent dark:placeholder-slate-500" placeholder="Add a new task" />
                    <button type='submit' onClick={submit}><img className="h-7 ml-4" src={add} alt="add png" /></button>
                </div>
            </form>
            <div className="flex justify-center m-auto mt-20">
                <div className="w-3/12 max-w-sm border border-indigo-900 rounded-md md:p-4 mr-32 dark:border-indigo-900">
                    <h1 className="text-slate-400 dark:text-slate-400 font-semibold">TO DO</h1>
                    <div>
                        <ul>
                            {
                                todo.map((item) => {
                                    return (
                                        <Fragment key={item._id}>
                                            <li key={item._id} className=" flex bg-slate-400 rounded-2xl py-2 mt-5 pl-4">
                                                <span>{item.description}</span>
                                                {
                                                    !item.isCompleted ? (
                                                        <button type="button" onClick={() => markTaskAsDone(item._id)} className="ml-5">
                                                            <img src={done} alt="done png" />
                                                        </button>
                                                    ) : null
                                                }
                                                <button type='submit' onClick={() => handleDeleteTask(item._id)} className="ml-2"><img src={bin} alt="bin png" /></button>
                                            </li>
                                        </Fragment>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className="w-3/12 max-w-sm border border-indigo-900 rounded-md md:p-4 dark:border-indigo-900">
                    <h1 className="text-slate-400 dark:text-slate-400 font-semibold">COMPLETED</h1>
                    <div>
                        <ul>
                            {completedTasks.map((item) => (
                                <li key={item._id} className="flex bg-slate-400 rounded-2xl py-2 mt-5 line-through pl-4">
                                    <span>{item.description}</span>
                                    <button type='submit' onClick={() => handleDeleteTask(item._id)} className="ml-5"><img src={bin} alt="bin png" /></button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;