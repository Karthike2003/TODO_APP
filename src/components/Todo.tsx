import React, { useContext, useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import { AuthContext } from '../context/AuthContext';
import Logout from './Logout';

interface Todo {
    task: string;
    completed: boolean;
}

const Todo: React.FC = () => {
    const { loggedIn, user } = useContext(AuthContext);
    const [todos, setTodos] = useState<Todo[]>([]);
    const [task, setTask] = useState<string>('');
    const [filter, setFilter] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        if (loggedIn && user && user.todos) {
            const storedTodos = localStorage.getItem(`todos_${user.id}`);
            if (storedTodos) {
                setTodos(JSON.parse(storedTodos));
            } else {
                setTodos(user.todos.map((todo: string) => ({ task: todo, completed: false })));
            }
        }
    }, [loggedIn, user]);
    

    const addTodo = (task: string) => {
        setTodos([...todos, { task, completed: false }]);
    };

    const updateTodo = (index: number, updatedTask: string, completed?: boolean) => {
        const newTodos = [...todos];
        newTodos[index] = { ...newTodos[index], task: updatedTask };
        if (completed !== undefined) {
            newTodos[index].completed = completed;
        }
        setTodos(newTodos);
    };

    const deleteTodo = (index: number) => {
        setTodos(todos.filter((_todo: Todo, i: number) => i !== index));
    };

    const clearCompleted = () => {
        setTodos(todos.filter((todo: Todo) => !todo.completed));
    };

    const filteredTodos = todos.filter((todo: Todo) => {
        if (filter === 'all') return true;
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    }).filter((todo: Todo) => todo.task.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleSave = () => {
        if (user) {  
            localStorage.setItem(`todos_${user.id}`, JSON.stringify(todos));
            alert('Todos have been saved!');
        } else {
            alert('User not found. Please log in.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Todo List</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        addTodo(task);
                        setTask('');
                    }}
                    className="mb-4"
                >
                    <input
                        type="text"
                        placeholder="New Task"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        required
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                    />
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Add Task</button>
                </form>
                <div className="flex mb-4">
                    <button onClick={() => setFilter('all')} className={`mr-2 ${filter === 'all' ? 'font-bold' : ''}`}>All</button>
                    <button onClick={() => setFilter('active')} className={`mr-2 ${filter === 'active' ? 'font-bold' : ''}`}>Active</button>
                    <button onClick={() => setFilter('completed')} className={`mr-2 ${filter === 'completed' ? 'font-bold' : ''}`}>Completed</button>
                </div>
                <input
                    type="text"
                    placeholder="Search Tasks"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <ul>
                    {filteredTodos.map((todo: Todo, index: number) => (
                        <TodoItem
                            key={index}
                            todo={todo}
                            index={index}
                            updateTodo={updateTodo}
                            deleteTodo={deleteTodo}
                        />
                    ))}
                </ul>
                {todos.some((todo: Todo) => todo.completed) && (
                    <button onClick={clearCompleted} className="text-sm text-gray-600">Clear Completed</button>
                )}
                <div className="flex justify-end space-x-4">
                    <button onClick={handleSave} className="text-sm w-12 bg-green-500 rounded-sm text-white mt-4">Save</button>
                    {loggedIn && <Logout />}
                </div>
            </div>
        </div>
    );
};

export default Todo;
