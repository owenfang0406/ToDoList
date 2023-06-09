import React, { useEffect, useState, useRef, useContext } from 'react'
import{ TiEdit } from 'react-icons/ti'
import TodoForm from './TodoForm'
import './Todo.css'
import { ContextStore } from '../App'

function Todo({todos, completeTodo, removeTodo, updateTodo, addToCompletedList, showCompletedTodosOnly = false, completedTodos}) {
// Use the useContext hook to access the isChecked value from the ContextStore context
const { isChecked } = useContext(ContextStore)
 // Use useRef hooks to reference the container divs that hold the todo items
const containerRef = useRef(null)
const containerRef2 = useRef(null)
// Initialize the edit state variable to an object with empty values
const [edit, setEdit] = useState ({
    id: null,
    value: '',
    timestamp:'',
    isComplete:'',
})

// Function to handle submitting an updated todo item
const submitUpdate = (value) => {
    updateTodo(edit.id, value)
    setEdit({
        id: null,
        value: '',
        timestamp:'',
        isComplete:'',
    })
}

// Use the useEffect hook to scroll the container div to the last todo item whenever the todos, completedTodos, or isChecked props change
useEffect(() => {
    if (containerRef.current !== null && !isChecked) {
      const container = containerRef.current;
      const lastTodoElement = container.querySelector('.todo-row:last-child');
      if (lastTodoElement?.offsetTop !== undefined) {
        lastTodoElement?.scrollIntoView({behavior: 'smooth'})
      }
    }

    if (containerRef2.current !== null) {
        const container = containerRef2.current;
        const lastTodoElement = container.querySelector('.todo-row:last-child');
        if (lastTodoElement?.offsetTop !== undefined) {
            
          lastTodoElement?.scrollIntoView(true, {behavior: 'smooth'})
        }
      }

  }, [todos.length, completedTodos?.length, isChecked]);

  
  
// If the edit state variable has an id property, render the TodoForm component with the edit and submitUpdate props
if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate}></TodoForm>
}

 // If showCompletedTodosOnly is true, map through the completedTodos array and render a todo item for each one
 // This component is intended to provide 3 different version of JSX based on the instructed arguments to  determine which one of three
 // to be return when this component is used elsewhere.
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
                        <div key={todo.id} className={todo.isComplete ? 'todoText complete' : 'todoText'} >
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
                    onClick={() => setEdit({ id: todo.id, value: todo.text, timestamp: todo.timestamp, isComplete: todo?.isComplete })}
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
                        <div key={todo.id} className={todo.isComplete ? 'todoText complete' : 'todoText'} >
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
                    onClick={() => setEdit({ id: todo.id, value: todo.text, timestamp: todo.timestamp, isComplete: todo?.isComplete })}
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
                        <div key={todo.id} className={todo.isComplete ? 'todoText complete' : 'todoText'} >
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
                    onClick={() => setEdit({ id: todo.id, value: todo.text, timestamp: todo.timestamp, isComplete: todo?.isComplete })}
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