import React from 'react';
import type todoItemType from '../utils/types/todoItemType';

const TodoElement = (
    {todoData, onChangeCallback, onDeleteCallback, moveUpCallback, moveDownCallback, downDisabled} 
    : {
        todoData: todoItemType, 
        onChangeCallback: (newValue: todoItemType) => void, 
        onDeleteCallback: (index: number) => void, 
        moveUpCallback: (index: number) => void,
        moveDownCallback: (index: number) => void, 
        downDisabled: boolean 
    }
) => {
    const [text, setText] = React.useState<string>(todoData.text);
    const [edit, setEdit] = React.useState<boolean>(false);

    const handleSave = () => {
        setEdit(edit => !edit);
        onChangeCallback({...todoData, text})
    }

    return (
        <li>
            {
                edit
                ? <>
                    <input value={text} onChange={e => setText(e.target.value)}></input>
                    <button onClick={handleSave}>Save</button>
                </>
                : <>
                    <input type="checkbox" id={`todoCheckbox${todoData.pos}`} checked={todoData.completed} onChange={() => onChangeCallback({...todoData, completed: !todoData.completed})}></input>
                    <label htmlFor={`todoCheckbox${todoData.pos}`} style={todoData.completed ? { textDecoration: "line-through"} : {}}>{todoData.text}</label>
                    <button onClick={() => setEdit(edit => !edit)}>Edit</button>
                    <button onClick={() => moveUpCallback(todoData.pos)} disabled={todoData.pos <= 0}>Up</button>
                    <button onClick={() => moveDownCallback(todoData.pos)} disabled={downDisabled}>Down</button>
                </>
            }
            <button onClick={() => onDeleteCallback(todoData.pos)}>Delete</button>
            
        </li>
    );
}

export default TodoElement;