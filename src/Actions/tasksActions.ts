import {toast} from 'sonner'
import { ADDTASK, CHECK, DELETETASK, GETTASKS, UNCHECK } from '../routes'

export const getTasks = async ({ username }:{ username:string }) => {
  try {
    const res = await fetch(GETTASKS + username, {
      method: 'GET',
      headers: {'Content-Type':'application/json'},
      credentials: 'include'
    })

    const data = await res.json()
    if(!res.ok) {
      throw new Error(data.message)
    }

    return data.tasks
  } catch (e) {
    console.error(e)
  }
}

export async function deleteTask ({ id }:{ id: number }) {
  if(!id) return

  try {
    const res = await fetch(`${DELETETASK}${id}`, {
      method:'DELETE',
      headers:{'Content-Type':'application/json'}
    })

    const data = await res.json()

    if(!res.ok) {
      toast.error(data.message)
      throw new Error(data.message)
    }

    toast.success(data.message)
  } catch (e) {
    console.error(e)
  }
}

export async function checkTask ({ id }:{ id: number }) {
  if(!id) return

  try {
    const res = await fetch(`${CHECK}${id}`, {
      method:'PUT',
      headers:{'Content-Type':'application/json'}
    })

    const data = await res.json()

    if(!res.ok) {
      toast.error(data.message)
      throw new Error(data.message)
    }

    toast.success(data.message)
  } catch (e) {
    console.error(e)
  }
}

export async function uncheckTask ({ id }:{ id: number }) {
  if(!id) return

  try {
    const res = await fetch(`${UNCHECK}${id}`, {
      method:'PUT',
      headers:{'Content-Type':'application/json'}
    })

    const data = await res.json()

    if(!res.ok) {
      toast.error(data.message)
      throw new Error(data.message)
    }

    toast.success(data.message)
  } catch (e) {
    console.error(e)
  }
}

export async function addTask ({ text, username, date }:{ text:string, username: string | undefined, date: string }) {
  if(!text || !username || !date) return
  
  try {
    const res = await fetch(ADDTASK, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        text, 
        username,
        date
      })
    })

    const data = await res.json()
    if(!res.ok) {
      toast.error(data.message)
    }

    toast.success(data.message)
  }  catch (e) {
    console.error(e)
  }
}