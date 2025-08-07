import { Link } from "react-router-dom"
import { useAuth } from "../context/UserContext"

const Header = () => {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (


    <header className="bg-[#e19f41] shadow-md">
      <div>
        <div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/85/Logo-Test.png"
            alt="imagen de logo"
          />
        </div>
        <nav>
          <ul>
            {/* Cambiar elementos a por componentes Link de react-router-dom */}
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
            {
              user && <>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <button onClick={handleLogout}>Cerrar sesión</button>
              </>
            }
            {
              !user && <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/registrate">Registrate</Link></li>
              </>
            }
          </ul>
        </nav>
      </div>
    </header>
  )
}

export { Header }