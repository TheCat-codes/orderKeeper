/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useTaskStore } from "../stores/tasksStore"

import { TasksTable } from "./Table"
import { getTasks } from "../Actions/tasksActions"
import { useUserStore } from "../stores/authStore"
import { TaskForm } from "./newTask"
import { Menu } from "./Menu"

export function Dashboard() {
  const setTasks = useTaskStore(state => state.setTasks)
  const user = useUserStore(state => state.user)
  const setLoading = useTaskStore(state => state.setLoading)
  const tasks = useTaskStore(state => state.tasks)

  useEffect(() => {
    setLoading()
    const get = async () => {
    if(user === null) return
    try {
      const res = await getTasks({ username: user.username })
      if(res) {
        setLoading()
        setTasks(res)
        return
      }
      setTasks([])
    } catch (e) {
      setLoading()
      console.error(e)
    }
    }

    get()
  }, [])


  return (
    <>
      <Menu />
      <TasksTable tasks={tasks ?? []}/>
      <TaskForm />
    </>
  )
}