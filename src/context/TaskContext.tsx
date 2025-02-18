import React, { createContext, useEffect, useState } from 'react'

export type TaskStatus =
  | 'To Do'
  | 'In Progress'
  | 'In QA'
  | 'Done'
  | 'Blocked'
  | 'Deployed'

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
}

interface TaskContextType {
  tasks: Task[]
  addTask: (title: string, description: string) => void
  deleteTask: (id: string) => void
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined)

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  })

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      status: 'To Do',
    }
    setTasks([...tasks, newTask])
  }
  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }
  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  )
}
