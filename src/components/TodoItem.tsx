import React, { useState } from 'react';

interface TodoItemProps {
    todo: { task: string, completed: boolean };
    index: number;
    updateTodo: (index: number, updatedTask: string, completed?: boolean) => void;
    deleteTodo: (index: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, index, updateTodo, deleteTodo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTask, setNewTask] = useState(todo.task);

    const toggleCompleted = () => {
        updateTodo(index, todo.task, !todo.completed);
    };

    return (
        <li className={`flex justify-between items-center mb-2 ${todo.completed ? 'line-through' : ''}`}>
            <input type="checkbox" checked={todo.completed} onChange={toggleCompleted} />
            {isEditing ? (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        updateTodo(index, newTask);
                        setIsEditing(false);
                    }}
                    className="flex-grow"
                >
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <button type="submit" className="bg-green-500 text-white p-2 rounded ml-2">Update</button>
                </form>
            ) : (
                <>
                    <span className="flex-grow">{todo.task}</span>
                    <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white p-2 rounded mr-2">Edit</button>
                    <button onClick={() => deleteTodo(index)} className="bg-red-500 text-white p-2 rounded">Delete</button>
                </>
            )}
        </li>
    );
};

export default TodoItem;
