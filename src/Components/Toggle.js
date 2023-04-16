import React, { useContext, useEffect, useState } from 'react'
import './Toggle.css'
import { ContextStore } from '../App'

function Toggle() {
  const { isChecked, toggleCheckbox } = useContext(ContextStore);

  return (
    <div>
        <input
        type='checkbox'
        id="check"
        className='checkBoxInput'
        // onChange={() => toggleCheckbox()}
        checked={isChecked}
        ></input>
        <label
        for="check"
        htmlFor="check"
        className='button'
        onClick={() => toggleCheckbox()}
        ></label>
    </div>
  )
}

export default Toggle