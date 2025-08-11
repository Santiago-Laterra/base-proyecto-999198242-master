import { Link } from "react-router-dom"
import { useAuth } from "../context/UserContext"
import { useState } from "react"

const Header = () => {
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false);
  const handleLogout = () => {
    logout()
  }

  return (
    <header className="fixed top-0 left-0 w-full bg-amber-800 shadow-md">
      <div className="flex items-center justify-between px-8 py-4">
        <div>
          <span style={{ fontFamily: "'Lobster', cursive" }} className="text-3xl text-red-50 font-extrabold">Alta Pinta</span>
        </div>
        {/* Botón hamburguesa*/}
        <button className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}> ☰ </button>

        {/* menu pantalla de escritorio */}

        <nav className="hidden md:block">
          <ul className="flex space-x-15 text-orange-100 text-base items-center">
            {/* Cambiar elementos a por componentes Link de react-router-dom */}

            <li>
              <Link to="/"
                className="font-bold hover:bg-orange-400/25 py-2 px-3 rounded-full">Inicio
              </Link>
            </li>
            <li>
              <Link to="/nosotros"
                className="font-bold hover:bg-orange-400/25 py-2 px-3 rounded-full">Nosotros
              </Link>
            </li>
            {
              user && <>
                <li>
                  <Link to="/dashboard"
                    className="font-bold hover:bg-orange-400/25 py-2 px-3 rounded-full">Dashboard
                  </Link>
                </li>
                <button onClick={handleLogout}
                  className="text-center text-red-50 font-semibold py-1 px-2 hover:bg-red-50 hover:text-amber-800 rounded-full border-2 border-neutral-100">Cerrar sesión
                </button>
              </>
            }
            {
              !user && <>
                <li>
                  <Link to="/login"
                    className="font-bold hover:bg-orange-400/25 py-2 px-3 rounded-full">Login
                  </Link>
                </li>
                <li>
                  <Link to="/registrate"
                    className="bg-lime-700 rounded-full py-1 px-2   hover:bg-lime-800 transition font-bold">Registrate
                  </Link>
                </li>
              </>
            }
          </ul>
        </nav>
      </div>

      {/* menu para mobiles */}

      {menuOpen && (
        <nav className="md:hidden bg-amber-800 px-4 pb-4">
          <ul className="flex flex-col space-y-2">
            {user && (
              <>
                <li>
                  <Link to="/"
                    className="font-bold hover:bg-orange-400/25 py-2 px-3 rounded-full" onClick={() => setMenuOpen(false)}>Inicio
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard"
                    className="font-bold hover:bg-orange-400/25 py-2 px-3 rounded-full"
                    onClick={() => setMenuOpen(false)}>Dashboard
                  </Link>
                </li>
                <button
                  onClick={() => { handleLogout(); setMenuOpen(false); }}
                  className="text-center text-red-50 font-semibold py-1 px-2 hover:bg-red-50 hover:text-amber-800 rounded-full border-2 border-neutral-100">Cerrar sesión
                </button>
              </>
            )}
            {!user && (
              <>
                <li>
                  <Link to="/"
                    className="font-bold hover:bg-orange-400/25 py-2 px-3 rounded-full"
                    onClick={() => setMenuOpen(false)}> Inicio
                  </Link>
                </li>
                <li>
                  <Link to="/nosotros"
                    className="font-bold hover:bg-orange-400/25 py-2 px-3"
                    onClick={() => setMenuOpen(false)}> Nosotros
                  </Link>
                </li>
                <li>
                  <Link to="/login"
                    className="font-bold hover:bg-orange-400/25 py-2 px-3 rounded-full"
                    onClick={() => setMenuOpen(false)}> Login
                  </Link>
                </li>
                <li>
                  <Link to="/registrate"
                    className="bg-lime-700 rounded-full py-1 px-2 hover:bg-lime-800 k"
                    onClick={() => setMenuOpen(false)}> Registrate
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}
    </header >
  )
}

export { Header }