import './App.css';
import PageTitle from './Components/PageTitle';
import TodoList from './Components/TodoList';
import { useState, createContext } from 'react';

export const ContextStore = createContext({
  isChecked: false,
  toggleCheckbox: () => {},
})

function App() {
  const [isChecked, setIsChecked] = useState(false);
  const toggleCheckbox = () => {
    setIsChecked(() => !isChecked);
  };


  return (
    <ContextStore.Provider value={{isChecked, toggleCheckbox}}>
      <div>
        <PageTitle></PageTitle>
        <TodoList></TodoList>
      </div>
    </ContextStore.Provider>
  );
}

export default App;