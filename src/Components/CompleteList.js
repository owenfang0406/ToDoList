import React from 'react'
import "./CompleteList.css"
import Toggle from './Toggle'

function CompleteList() {
  return (
    <div className='CompleteListCon'>
        <div className='upperBox'>
          <hr></hr>
          <div className='toggleCon'>
              <div className='moveDownToEndNote'>Move done things to end?</div>
              <Toggle className='toggle'/>
          </div>
        </div>
        <div className='completedTodosCon'>
        </div>
    </div>
  )
}

export default CompleteList