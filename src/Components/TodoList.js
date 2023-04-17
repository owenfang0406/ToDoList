import React, { useState } from 'react'
import TodoForm from './TodoForm'
import Todo from './Todo'
import './TodoList.css'
import ProgressBar from './ProgressBar'
import CompleteList from './CompleteList'

function TodoList() {
const [todos, setTodos] = useState([])
const [completedTodos, setCompletedTodos] = useState([])

const addToCompletedList = (todo) => {
    if(todo.isComplete) {
        setCompletedTodos(prevCompletedTodos => prevCompletedTodos.filter(CompletedTodo => CompletedTodo.id !== todo.id))
        completeTodo(todo.id);
    } else {
        completeTodo(todo.id);
        setCompletedTodos(prevCompletedTodos => [...prevCompletedTodos, todo]);
    }
}

const addTodo = todo => {
    if(!todo.text || /^\s*$/.test(todo)) {
        return
    }

    const newTodos = [todo, ...todos]

    if (newTodos.length > 0) {
        newTodos.sort((a, b) => a.timestamp - b.timestamp)
    }

    setTodos(() => newTodos)
}

const updateTodo = (todoId, newValue) => {
    if(!newValue.text || /^\s*$/.test(newValue)) {
        return
    }

    if(completedTodos.some(todo => todo.id === todoId)) {
        setCompletedTodos((prev => prev.map(todo => (todo.id === todoId ? newValue : todo))))
        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))
        return
    }

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))
}


const removeTodo = id => {
    const removeArr = [...todos].filter(todo => todo.id !== id)
    const removerCompletedArr = [...completedTodos].filter(todo => todo.id !== id)

    setTodos(() => removeArr)
    setCompletedTodos(() => removerCompletedArr)
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
    <div className='wrapper'>
        <div className='progressBarCon'>
            <ProgressBar
            todos={todos}
            completedTodos={completedTodos}
            ></ProgressBar>
        </div>
        <div className='todoCon'>
            <Todo 
            addToCompletedList={addToCompletedList}
            todos={todos}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
            ></Todo>
            <div className='inputBox'>
                <div className='inputBoxSubCon'>
                    <h3 className='addToListNote'>Add to list</h3>
                    <TodoForm
                    onSubmit={addTodo}
                    ></TodoForm>
                </div>
            </div>
        </div>
        <CompleteList             
            todos={todos}
            completedTodos={completedTodos}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
            addToCompletedList={addToCompletedList}
            >
        </CompleteList>
    </div>
  )
}

export default TodoList