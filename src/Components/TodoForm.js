import React, { useEffect, useRef, useState } from 'react'
import './TodoForm.css'

function TodoForm(props) {
const [input, setInput] = useState(props?.edit?.value ? props.edit.value : '')
const inputRef = useRef(null)
console.log(props.edit)
useEffect(() => {
    inputRef.current.focus();
},[])

const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
        id: Math.floor(Math.random() * 10000),
        text: input
    });

    setInput('');
}

const handleChange = e => {
    setInput(() => e.target.value)
}

  return (
    <form className='todo-form' onSubmit={handleSubmit}>
        {
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
        <button className='todo-button edit'>Update</button>
        </>
        ) : 
        
        (
        <>
        <input type='text'
        placeholder='Add a todo'
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