import React, { useState } from 'react'
import { RiCloseCircleLine } from 'react-icons/ri'
import{ TiEdit } from 'react-icons/ti'
import TodoForm from './TodoForm'
import './Todo.css'

function Todo({todos, completeTodo, removeTodo, updateTodo, addToCompletedList}) {
const [edit, setEdit] = useState ({
    id: null,
    value: ''
})

const submitUpdate = value => {
    updateTodo(edit.id, value)
    setEdit({
        id: null,
        value: '' 
    })
}

if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate}></TodoForm>
}
  return (
    todos.map((todo, index) => (
        <div 
        className='todo-row'
        key={index}>
            <div className='subBox'>
                <label className='checkbox' for='myCheckBox' onClick={() => 
                    {
                        completeTodo(todo)
                        addToCompletedList(todo)    
                    }} >
                    <input
                    type="checkbox"
                    id='myCheckBox'
                    className='checkBoxInput'
                    checked={todo.isComplete}
                    onChange={() => 
                        {
                            addToCompletedList(todo)
                            completeTodo(todo)
                        }
                    }>
                    </input>
                    <div className='actualCheckBox'>

                    </div>
                    <div key={todo.id} className={todo.isComplete ? 'complete' : ''} >
                        {todo.text}
                    </div>
                </label>
            </div>
            <div className='icons'>
                <div
                 onClick={() => removeTodo(todo.id)}
                 className='delete-icon'
                >
                <span class="close-symbol">
                        <span class="close-symbol__line">
                            </span><span class="close-symbol__line">
                        </span>
                </span>
                </div>
                <TiEdit
                onClick={() => setEdit({ id: todo.id, value: todo.text })}
                className='edit-icon'
                />
            </div>
        </div>
    ))
  )
}

export default Todo