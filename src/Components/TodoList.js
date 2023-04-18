import React, { useContext, useState } from 'react'
import TodoForm from './TodoForm'
import Todo from './Todo'
import './TodoList.css'
import ProgressBar from './ProgressBar'
import CompleteList from './CompleteList'
import { ContextStore } from '../App'

function TodoList() {

// state variables to keep track of todos and completed todos
const [todos, setTodos] = useState([])
const [completedTodos, setCompletedTodos] = useState([])

// getting checked state from context
const { isChecked } = useContext(ContextStore)


// function to add or remove a todo from the completedTodos array
const addToCompletedList = (todo) => {
    if(todo.isComplete) {
        // removing todo from completedTodos array
        setCompletedTodos(prevCompletedTodos => prevCompletedTodos.filter(CompletedTodo => CompletedTodo.id !== todo.id))
        completeTodo(todo.id);
    } else {
        // adding todo to completedTodos array
        completeTodo(todo.id);
        setCompletedTodos(prevCompletedTodos => [...prevCompletedTodos, todo]);
    }
}

// function to add a new todo to the todos array
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


 // function to update a todo
const updateTodo = (todoId, newValue, timestamp) => {
    if(!newValue.text || /^\s*$/.test(newValue)) {
        return
    }

    if(completedTodos.some(todo => todo.id === todoId)) {
        // updating a completed todo
        setCompletedTodos((prev => prev.map(todo => (todo.id === todoId ? newValue : todo))))
        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))
        return
    }

    // updating an incomplete todo
    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))
}

// function to remove a todo
const removeTodo = id => {
    const removeArr = [...todos].filter(todo => todo.id !== id)
    const removerCompletedArr = [...completedTodos].filter(todo => todo.id !== id)

    setTodos(() => removeArr)
    setCompletedTodos(() => removerCompletedArr)
}

// function to mark a todo as complete or incomplete
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
        
        {/* Progress bar */}
        <div className='progressBarCon'>
            <ProgressBar
            todos={todos}
            completedTodos={completedTodos}
            ></ProgressBar>
        </div>

        {/* Incomplete todos */}
        <div className=" max-w-[1400px] h-full mx-auto px-[20px] overflow-y-scroll scrollbar-thin scrollbar-w-10 scrollbar-thumb-blue-200">
            <Todo 
            addToCompletedList={addToCompletedList}
            todos={todos}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
            ></Todo>
        
        {/* Show completed todos only when checked is true */}
        {isChecked &&
            <Todo 
              todos={todos}
              completedTodos={completedTodos}
              showCompletedTodosOnly={true}
              completeTodo={completeTodo}
              removeTodo={removeTodo}
              updateTodo={updateTodo}
              addToCompletedList={addToCompletedList}
            ></Todo>
        }
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
        <div className='inputBox'>
            <div className='inputBoxSubCon'>
                <h3 className='addToListNote'>Add to list</h3>
                <TodoForm
                onSubmit={addTodo}
                ></TodoForm>
            </div>
        </div>
    </div>
  )
}

export default TodoList