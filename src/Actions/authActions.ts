import { LOGIN, REGISTER } from "../routes"

export const authLogin = async ({ username, password }:{username:string, password: string}) => {
  if(!username || !password) return 

  try {
      const res = await fetch(LOGIN, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type':'application/json'
        },
        body : JSON.stringify({
          username,
          password
        })
      })

      const data = await res.json()
      console.log(data)
      
      if(!res.ok) {
        return data.message
      }

      return data.user[0] 
  } catch (e) {
    const error = e as string
    throw new Error(error)
  }
}

export const register = async(name:string, username:string, password:string, age:string, email:string, confirmPassword:string) => {
  console.log(name, username, password, age, email)
  try {
    const intAge = parseInt(age)
    const res = await fetch(REGISTER,{
      method: 'POST',
      credentials:'include',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        name, 
        username, 
        password, 
        email, 
        age:intAge,
        confirmPassword
      })
    })

    const data = await res.json()
    console.log(data)
    if(!res.ok) {
      return data.message
    }

    return true
  } catch (e) {
    console.error(e)
  }
}