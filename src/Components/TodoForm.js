import React, { useEffect, useRef, useState } from 'react'
import './TodoForm.css'

function TodoForm(props) {
// Define a state variable to hold the current input value
const [input, setInput] = useState(props?.edit?.value ? props.edit.value : '')

// Define a ref to reference the input field, and focus it on component mount
const inputRef = useRef(null)
useEffect(() => {
    inputRef.current.focus();
},[])

// Handle form submission
const handleSubmit = (e, todo) => {
    e.preventDefault();

    // If editing an existing todo item, call the onSubmit prop with an updated todo object
    if(todo?.timestamp) {
        if (todo?.isComplete) {
            props.onSubmit({
                id: todo.id,
                text: input,
                isComplete: true,
                timestamp: Date.now()
            })
        } else {
            props.onSubmit({
                id: todo.id,
                text: input,
                isComplete: false,
                timestamp: Date.now()
            });
        }

    }
    // If adding a new todo item, call the onSubmit prop with a new todo object
    else {
        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            text: input,
            timestamp: Date.now(),
            isComplete: false
        });

    }

     // Clear the input field
    setInput('');
}

// Handle input field changes
const handleChange = e => {
    setInput(() => e.target.value)
}

  return (
    <form className='todo-form' onSubmit={(event) => handleSubmit(event, props?.edit)}>
        {
        // If editing an existing todo item, render an input field and an "Edit" button
        props.edit ? (
        <>
            <input type='text'
            placeholder='Update your todo'
            value={input}
            name='text'
            className='todo-input edit'
            onChange={handleChange}
            ref={inputRef}
            ></input>
            <button className='todo-button edit'>Send</button>
        </>
        ) : 
        
        (
        // If adding a new todo item, render an input field and a "Add" button with a plus icon
        <>
            <input type='text'
            value={input}
            name='text'
            className='todo-input'
            onChange={handleChange}
            ref={inputRef}
            ></input>
            <button className='todo-button'><span className="plus-icon">+</span></button>
        </>
        )
        }
    </form>
  )
}

export default TodoForm