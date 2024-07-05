import React from 'react';
import TodoElement from './TodoElement';
import type todoItemType from '../utils/types/todoItemType';

const initialTodoList: todoItemType[] = [
  {pos: 0, completed: false, text: "example"}
];

const filterTodoList = (todoList: todoItemType[], filterOption: string): todoItemType[] =>  {
  if (filterOption === "Completed") {
    return todoList.filter(el => el.completed);
  }
  if (filterOption === "Not Completed") {
    return todoList.filter(el => !el.completed);
  }
  return todoList;
}


const TodoList = () => {
    const [todoList, setTodoList] = React.useState<todoItemType[]>(initialTodoList);
    const [text, setText] = React.useState<string>("");
    const [filter, setFilter] = React.useState<string>("All");
  
    const handleAdd = (): void => {
      if (text?.trim())
      {
        setTodoList((curList: todoItemType[]) => [...curList, {completed: false, text: text, pos: curList.length}])
        setText("");
      }
    }

    const handleChangeValue = (newValue: todoItemType): void => {
        setTodoList(todoList.map(curEl => {
            return newValue.pos === curEl.pos? newValue :  curEl
        }));
    }

    const handleDeleteTodoItem = (index: number) => {
        setTodoList(todoList.filter(curEl => {
            return index !== curEl.pos;
        }));
    }

    const handleMoveDown = (index: number) => {
      if (index < (todoList.length - 1)) {
        todoList[index].pos = index + 1;
        todoList[index + 1].pos = index;
        setTodoList([...todoList.sort((a, b) => a.pos - b.pos)]);
      }
    }

    const handleMoveUp = (index: number) => {
      if (index > 0) {
        todoList[index].pos = index - 1;
        todoList[index - 1].pos = index;
        setTodoList([...todoList.sort((a, b) => a.pos - b.pos)]);
      }
    }
  
    return (
      <>
        <h1>Todo List V1</h1>
        <div>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
          <button onClick={handleAdd}>Add</button>
        </div>

        <label htmlFor="todoFilterOptions">Filter by:</label>
        <select name="todoFilterOptions" id="todoFilterOptions" onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Not Completed">Not Completed</option>
        </select>

        <ul>
          {filterTodoList(todoList, filter).map(el => {
            return <TodoElement key={el.pos} todoData={el} onChangeCallback={handleChangeValue} onDeleteCallback={handleDeleteTodoItem} moveUpCallback={handleMoveUp} moveDownCallback={handleMoveDown} downDisabled={el.pos === todoList.length - 1}/>
          })}
        </ul>
      </>
    )
}



export default TodoList;