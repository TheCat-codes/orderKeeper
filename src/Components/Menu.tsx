import { useNavigate } from "react-router-dom"
import { useUserStore } from "../stores/authStore"

export function Menu () {
  const navigate = useNavigate()
  const setUser = useUserStore(state => state.setUser)
  const handleLogout = () => {
    setUser(null)
    navigate('/')
  }

  return (
    <nav className="nav-bar">
      <label htmlFor="open">
        <svg width={25} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
          <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
        </svg>
      </label>
      <input type="checkbox" id="open"/>
      <ul className="list">
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  )
}