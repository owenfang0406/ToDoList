import React, { useEffect, useState, useRef, useContext } from 'react'
import { RiCloseCircleLine } from 'react-icons/ri'
import{ TiEdit } from 'react-icons/ti'
import TodoForm from './TodoForm'
import './Todo.css'
import { ContextStore } from '../App'

function Todo({todos, completeTodo, removeTodo, updateTodo, addToCompletedList, showCompletedTodosOnly = false, completedTodos}) {
const { isChecked } = useContext(ContextStore)
const containerRef = useRef(null)
const containerRef2 = useRef(null)
const [edit, setEdit] = useState ({
    id: null,
    value: '',
    timestamp:'',
})

const submitUpdate = value => {
    updateTodo(edit.id, value)
    setEdit({
        id: null,
        value: '',
        timestamp:'',
    })
}

useEffect(() => {
    console.log(showCompletedTodosOnly)
    if (containerRef.current !== null) {
      const container = containerRef.current;
      const lastTodoElement = container.querySelector('.todo-row:last-child');
      if (lastTodoElement?.offsetTop !== undefined) {
        lastTodoElement?.scrollIntoView({behavior: 'smooth'})
      }
    }

    if (containerRef2.current !== null) {
        const container = containerRef2.current;
        const lastTodoElement = container.querySelector('.todo-row:last-child');
        if (lastTodoElement.offsetTop !== undefined) {
          lastTodoElement?.scrollIntoView(true, {behavior: 'smooth'})
        }
      }

  }, [todos.length, completedTodos?.length, isChecked]);

  
  

if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate}></TodoForm>
}
  return (
    <div ref={containerRef}>
    {showCompletedTodosOnly ? 
    (
        completedTodos?.map((todo) => (
            <div 
            className='todo-row'
            key={todo.id}>
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
                    <span className="close-symbol">
                            <span className="close-symbol__line">
                                </span><span className="close-symbol__line">
                            </span>
                    </span>
                    </div>
                    <TiEdit
                    onClick={() => setEdit({ id: todo.id, value: todo.text })}
                    className='edit-icon'
                    />
                </div>
            </div>
            )
        )
    )
    : (
        isChecked ? (
        <div ref={containerRef2}>
            {todos.filter(todo => todo.isComplete !== true)?.map((todo) => (
            <div 
            className='todo-row2 todo-row'
            key={todo.id}>
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
                    <span className="close-symbol">
                            <span className="close-symbol__line">
                                </span><span className="close-symbol__line">
                            </span>
                    </span>
                    </div>
                    <TiEdit
                    onClick={() => setEdit({ id: todo.id, value: todo.text })}
                    className='edit-icon'
                    />
                </div>
            </div>
            ))}
        </div>
        ) : (
            
            todos.map((todo) => (
            <div 
            className='todo-row'
            key={todo.id}>
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
                    <span className="close-symbol">
                            <span className="close-symbol__line">
                                </span><span className="close-symbol__line">
                            </span>
                    </span>
                    </div>
                    <TiEdit
                    onClick={() => setEdit({ id: todo.id, value: todo.text })}
                    className='edit-icon'
                    />
                </div>
            </div>
                    )
                )
            )   
        )
    }
    </div>
  )
}

export default Todo