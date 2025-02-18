import React, { createContext, useEffect, useState } from 'react'
import { TASK_STATUSES } from '../constants'
export type TaskStatus = (typeof TASK_STATUSES)[keyof typeof TASK_STATUSES]

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  history: { previous: TaskStatus; next: TaskStatus; timestamp: Date }[]
}
export interface TaskHistoryEntry {
  previous: TaskStatus
  next: TaskStatus
  timestamp: Date
}
interface TaskContextType {
  tasks: Task[]
  addTask: (title: string, description: string) => void
  updateTask: (id: string, title: string, description: string) => void
  updateStatus: (id: string, newStatus: TaskStatus) => void
  deleteTask: (id: string) => void
  getTaskHistory: (id: string) => TaskHistoryEntry[]
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
      status: TASK_STATUSES.ToDo,
      history: [
        {
          previous: TASK_STATUSES.ToDo,
          next: TASK_STATUSES.ToDo,
          timestamp: new Date(),
        },
      ],
    }
    setTasks([...tasks, newTask])
  }
  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }
  const updateTask = (id: string, title: string, description: string) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, title, description } : task,
      ),
    )
  }
  const updateStatus = (id: string, newStatus: TaskStatus) => {
    setTasks(
      tasks.map(task => {
        if (task.id === id) {
          const prevStatus = task.status
          return {
            ...task,
            status: newStatus,
            history: [
              ...task.history,
              { previous: prevStatus, next: newStatus, timestamp: new Date() },
            ],
          }
        }
        return task
      }),
    )
  }
  const getTaskHistory = (id: string) => {
    return tasks.find(task => task.id === id)?.history || []
  }
  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        updateTask,
        updateStatus,
        getTaskHistory,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
