import React, { useState } from "react";
import { register } from "../Actions/authActions";
import { Link } from "react-router-dom";

export function RegisterForm () {
  const [mensaje , setMensaje] = useState<string | null>(null)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget

    const formdata = new FormData(form)
    const name = formdata.get('name') as string
    const username = formdata.get('username') as string
    const password = formdata.get('password') as string
    const confirmPassword = formdata.get('confirmPassword') as string
    const age = formdata.get('age') as string
    const email = formdata.get('email') as string

    const res = await register(name, username, password, age, email, confirmPassword)
    if(typeof res === 'string') {
      return setMensaje(res)
    }
    if(res === true) {
      setMensaje('User Registered')
    }
  }

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="name" placeholder="name"/>
        <input type="text" name="username" placeholder="username"/>
        <input type="text" name="password" placeholder="password"/>
        <input type="text" name="confirmPassword" placeholder="confirmPassword"/>
        <input type="text" name="email" placeholder="email"/>
        <input type="number" name="age" placeholder="age"/>
        <button>Register</button>
        {mensaje && <p>{mensaje}</p>}
        <Link to={'/'}>Log In</Link>
      </form>
    </>
  )
}