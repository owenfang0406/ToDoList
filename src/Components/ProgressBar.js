import React, { useEffect, useState } from 'react'
import './ProgressBar.css'

function ProgressBar({todos, completedTodos}) {
    const [progress, setProgress] = useState(0);


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

    useEffect(()=>{
        const completedCountValue = Object.values(completedTodos).filter(todo => todo.isComplete).length;
        const progressValue = todos.length > 0 ? Math.floor((completedCountValue / todos.length) * 100) : 0;
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