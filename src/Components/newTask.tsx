import type React from "react"
import { useUserStore } from "../stores/authStore"
import { addTask, getTasks } from "../Actions/tasksActions"
import { useTaskStore } from "../stores/tasksStore"

export function TaskForm () {
  const user = useUserStore(state => state.user)
  const setTasks = useTaskStore(state => state.setTasks)

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!user) return

    const form = e.currentTarget
    const formdata = new FormData(form)
    const text = formdata.get('text') as string
    const date = formdata.get('date') as string

    await addTask({ text, username: user?.username, date})

    try {
      const res = await getTasks({ username: user.username})
      setTasks(res)
    } catch (e) {
      console.error(e)
    }
    
    form.reset()
  }

  return (
    <form className="new-task-form" encType="multipart/form-data" onSubmit={handleSubmit}>
      <input placeholder="describe the task" className="text-task" type="text" name="text" />
      <input placeholder="limit date" type='date' name="date"/>
      <button type="submit">
        <svg width={30} height={30} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
        </svg>
      </button>
    </form>
  )
}