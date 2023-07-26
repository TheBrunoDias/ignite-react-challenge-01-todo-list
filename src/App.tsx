import { Header } from "./components/Header"
import styles from './app.module.css';
import { Form } from "./components/Form";
import { useCallback, useEffect, useState } from "react";
import { ITask, Tasks } from "./components/Tasks";

const LOCAL_STORAGE_KEY = '@ignite-react-challenge-1-todo-list';

function getTasksFromLocalStorage() {
  const localStorageTasks = window.localStorage.getItem(LOCAL_STORAGE_KEY);

  if (localStorageTasks) {
    return JSON.parse(localStorageTasks);
  }

  return [];
}

function App() {
  const [tasks, setTasks] = useState<ITask[]>(getTasksFromLocalStorage());

  function handleAddNewTask(content: string) {
    setTasks(prev => ([{ content, completed: false, id: crypto.randomUUID() }, ...prev]));
  }

  function handleRemoveTask(task: ITask) {
    setTasks(prev => prev.filter(i => i.id !== task.id));
  }

  function handleToogleTask(task: ITask) {
    const newTasksList = tasks.map(t => ({
      ...t,
      completed: t.id === task.id ? !t.completed : t.completed
    }));

    setTasks(newTasksList);
  }

  const saveTasksInLocalStorage = useCallback(() => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    saveTasksInLocalStorage();
  }, [saveTasksInLocalStorage, tasks]);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <Form onSubmit={handleAddNewTask} />
        <Tasks
          tasks={tasks}
          onRemoveTask={handleRemoveTask}
          onToggleTask={handleToogleTask}
        />
      </main>
    </>
  )
}

export default App
