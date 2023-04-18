import React, { useEffect, useRef, useState } from 'react'
import './TodoForm.css'

function TodoForm(props) {
const [input, setInput] = useState(props?.edit?.value ? props.edit.value : '')
const inputRef = useRef(null)
useEffect(() => {
    inputRef.current.focus();
},[])


const handleSubmit = (e, todo) => {
    e.preventDefault();
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

    }else {
        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            text: input,
            timestamp: Date.now(),
            isComplete: false
        });

    }


    setInput('');
}

const handleChange = e => {
    setInput(() => e.target.value)
}

  return (
    <form className='todo-form' onSubmit={(event) => handleSubmit(event, props?.edit)}>
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
        <button className='todo-button edit'>Send</button>
        </>
        ) : 
        
        (
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