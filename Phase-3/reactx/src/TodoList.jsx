import React from 'react'
import {useState,useEffect} from 'react'
const TodoList = () => {
    const [userinput, setUserinput] = useState('')
    const [tasks,setTasks] = useState(()=>{
        const savedTasks = localStorage.getItem('tasks');  // get saved tasks from localstorage when the component mounts
        if (savedTasks) {
            return JSON.parse(savedTasks);
        }
        return [   // if no saved tasks, return default tasks
            { id: 1, text: 'Dominate', completed: false },
            { id: 2, text: 'Conquer', completed: false },
            { id: 3, text: 'Rule', completed: false }
        ]
    })

    useEffect(() =>{  // save to localstorage whenever tasks change
        localStorage.setItem('tasks', JSON.stringify(tasks));
    },[tasks])

    const AddTask = ()=>{
        setTasks([...tasks, { id: Date.now(), text: userinput, completed: false }])
        setUserinput('')
    }
    const DeleteTask = (index)=>{
        setTasks(tasks.filter((task, i) => i !== index))
    }
    const MoveUp = (index)=>{
        if(index === 0) return;
        setTasks(prevTasks => {
            const newTasks = [...prevTasks];
            [newTasks[index - 1], newTasks[index]] = [newTasks[index], newTasks[index - 1]];
            return newTasks;
        });
    }
    const MoveDown = (index)=>{
        if(index === tasks.length - 1) return;
        setTasks(prevTasks => {
            const newTasks = [...prevTasks];
            [newTasks[index], newTasks[index + 1]] = [newTasks[index + 1], newTasks[index]];
            return newTasks;
        });
    }
  return (
    <div>
        <h2>Todo List</h2>
        <div>
            <input type="text" placeholder="Add a new task" value={userinput} onChange={(e) => setUserinput(e.target.value)}/>
            <button onClick={AddTask}>Add</button>
        </div>
        <div className="todo-items">
            <ol>
                {tasks.map((task, index) => (
                    <li key={task.id}>
                        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                            {task.text}
                        </span>
                        <button onClick={() => DeleteTask(index)}>Delete</button>
                        <button onClick={() => MoveUp(index)}>Move Up</button>
                        <button onClick={() => MoveDown(index)}>Move Down</button>
                        <button onClick={() => setTasks(prevTasks => prevTasks.map((t, i) => i === index ? {...t, completed: !t.completed} : t))}>
                            {task.completed ? '✓' : '✗'}
                        </button>
                    </li>
                ))}
            </ol>
            {/* { console.log(tasks)} */}
        </div>
        <p>{userinput}</p>
    </div>
  )
}

export default TodoList
//add delete move up down tick untick savetolocalstorage!
{/* <li>Dominate</li>
<li>Conquer</li>
<li>Rule</li> */}

// use map to render the list of tasks from SETTASK and add buttons for delete, move up, move down, and tick/untick.
// use array of objects instead of array of strings to store tasks with their completed status.

// save to localstrage, read data on load using useEffect and write on change every time the state changes.
// use json.stringify to save the array of objects to localstorage and json.parse to read it back.