import { Link } from "react-router-dom"
import { useAuth } from "../context/UserContext"

const Header = () => {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="bg-amber-800 shadow-md">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/85/Logo-Test.png"
            alt="imagen de logo"
            className="h-12 w-auto"
          />
        </div>
        <nav>
          <ul className="flex space-x-6 text-orange-100 text-base items-center">
            {/* Cambiar elementos a por componentes Link de react-router-dom */}
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
            {
              user && <>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <button onClick={handleLogout} className="text-center text-red-50 font-semibold py-1 px-2 hover:bg-red-50 hover:text-amber-800 rounded-full border-2 border-neutral-100">Cerrar sesión</button>
              </>
            }
            {
              !user && <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/registrate" className="bg-lime-700 rounded-full py-1 px-2 hover:bg-lime-800 transition">Registrate</Link></li>
              </>
            }
          </ul>
        </nav>
      </div>
    </header>
  )
}

export { Header }