import React, { createContext, useEffect, useState } from 'react'

export type TaskStatus =
  | 'ToDo'
  | 'InProgress'
  | 'InQA'
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
      status: 'ToDo',
    }
    setTasks([...tasks, newTask])
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask }}>
      {children}
    </TaskContext.Provider>
  )
}
