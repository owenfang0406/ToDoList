import React, { useContext, useEffect, useState } from 'react'
import "./CompleteList.css"
import Toggle from './Toggle'
import Todo from './Todo'
import { ContextStore } from '../App'

function CompleteList({completedTodos, todos, completeTodo, removeTodo, updateTodo, addToCompletedList}) {
    const { isChecked } = useContext(ContextStore)
  return (
    <div className='CompleteListCon'>
        <hr></hr>
        <div className='toggleCon'>
            <Toggle className='toggle'/>
        </div>
        <div className='completedTodosCon'>
        {isChecked && <Todo 
            todos={todos}
            completedTodos={completedTodos}
            showCompletedTodosOnly={true}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
            addToCompletedList={addToCompletedList}
        ></Todo>}
        </div>
    </div>
  )
}

export default CompleteList