import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const stateOptions = {
  Incomplete : "Incomplete",
  InProgress : "In Progress",
  Completed : "Completed",
}

type StateTask = keyof typeof stateOptions

export interface Tasks {
  task_id: number,
  text: string,
  user_task: string,
  state: StateTask,
  limit_date: Date
}

interface TaskState {
  tasks: Tasks[] | null,
  error: string | null,
  loading: boolean,
  setLoading: () => void,
  setError: (error: string | null) => void,
  setTasks: (user: Tasks[] | null) => void,
  checkTaskInStore: (id:number) => void,
  deleteTaskInStore: (id:number) => void,
  uncheckTaskInStore: (id:number) => void
  // addTasks: (username:string, text:string, date:string) => void
}

export const useTaskStore = create<TaskState>()(persist((set, get) => ({
  tasks: null,
  error: null,
  loading: false,
  setLoading: () => {
    const { loading } = get()
    set({ loading: !loading, error: null })
  },
  setError: (error: string | null) => {
    set({ error, loading: false })
  },
  setTasks: (tasks: Tasks[] | null) => {
    set({ tasks, loading: false, error: null })
  },
  checkTaskInStore: (id:number) => {
    if(!id) return

    const { tasks } = get()
    if(!tasks) return

    const newTasks = structuredClone(tasks)
    const taskIndex = newTasks?.findIndex(ta => ta.task_id === id)

    const taskInfo = newTasks[taskIndex]

    newTasks[taskIndex] = {
      ...taskInfo,
      state: 'Completed'
    }

    set({ tasks: newTasks, error: null, loading: false })
  },
  uncheckTaskInStore: (id:number) => {
    if(!id) return

    const { tasks } = get()
    if(!tasks) return

    const newTasks = structuredClone(tasks)
    const taskIndex = newTasks?.findIndex(ta => ta.task_id === id)

    const taskInfo = newTasks[taskIndex]

    newTasks[taskIndex] = {
      ...taskInfo,
      state: 'Incomplete'
    }

    set({ tasks: newTasks, error: null, loading: false })
  },
  deleteTaskInStore: (id:number) => {
    if(!id) return

    const { tasks } = get()
    if(!tasks) return

    const newTasks = structuredClone(tasks)
    const setTasks = newTasks.filter(task => task.task_id !== id)
    set({ tasks: setTasks })
  }
}),{
  name:'tasks'
}))