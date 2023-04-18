import React, { useEffect, useState } from 'react'
import './ProgressBar.css'

function ProgressBar({todos, completedTodos}) {
    // Initialize progress state variable to 0
    const [progress, setProgress] = useState(0);

    // Function to get the color of the progress bar based on the progress value
    const getColor = () => {
        if(progress < 40) {
            return "#ff0000";
        }
        else if (progress < 70) {
            return "#ffa500";
        }
        else {
            return "#2ecc71"
        }

    }

    // Update the progress state variable whenever the todos or completedTodos props change
    useEffect(()=>{

        // Get the number of completed todos by filtering the completedTodos array and getting the length of the resulting array
        const completedCountValue = Object.values(completedTodos).filter(todo => todo.isComplete).length;

        // Calculate the progress value as a percentage (rounded down to the nearest integer)
        const progressValue = todos.length > 0 ? Math.floor((completedCountValue / todos.length) * 100) : 0;

        // Update the progress state variable with the new progress value
        setProgress(progressValue);

    }, [todos.length, completedTodos.length])

  return (
    <div className='container'>
        <div className='progressLabel'>{progress}%</div>
        <div className='progressBar'>
            <div className='progressBarFilled' style={{ width: `${progress}%`, backgroundColor: getColor()}}></div>
        </div>
    </div>
  )
}

export default ProgressBar