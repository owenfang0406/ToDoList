import React, { useState } from 'react'
import TodoForm from './TodoForm'
import Todo from './Todo'
import './TodoList.css'

function TodoList() {
const [todos, setTodos] = useState([])

const addTodo = todo => {
    if(!todo.text || /^\s*$/.test(todo)) {
        return
    }

    const newTodos = [todo, ...todos]

    setTodos(() => newTodos)
}

const updateTodo = (todoId, newValue) => {
    if(!newValue.text || /^\s*$/.test(newValue)) {
        return
    }

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))
}


const removeTodo = id => {
    const removeArr = [...todos].filter(todo => todo.id !== id)

    setTodos(() => removeArr)
}


const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
        if(todo.id === id) {
            todo.isComplete = !todo.isComplete
        }
        return todo
    })

    setTodos(() => updatedTodos)
}

  return (
    <div>
        <Todo 
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        ></Todo>
        <div className='inputBox'>
        <h3>Add to list</h3>
        <TodoForm
        onSubmit={addTodo}
        ></TodoForm>
        </div>
    </div>
  )
}

export default TodoList