import { useState } from "react"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/UserContext"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useAuth()

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    //validaciones

    if (!username && !password) {
      setError("Debes completar todos los campos")
      return
    }
    if (!username) {
      setError("Debes completar el nombre")
      return
    }
    if (username.length <= 3) {
      setError("El nombre debe tener al menos 3 caracteres")
      return
    }
    if (!password) {
      setError("Debes completar el password")
      return
    }

    //peticion a la base fake
    const isLogin = await login(username, password)

    if (isLogin) {

      //reset el formulario
      setUsername("")
      setPassword("")
      //redirecciono
      navigate("/")
    } else {
      setUsername("")
      setPassword("")
      setError("Usuario o contraseña incorrecto")

    }
  }

  return (
    <Layout>
      <div>
        <div>
          <h1>Inicia sesión</h1>
          <section>
            <h2>Bienvenido a nuestra tienda</h2>
            <p>Credenciales de prueba:</p>
            <p>Usuario:johnd</p>
            <p>Contraseña:m38rmF$</p>
            <form onSubmit={handleLogin}>
              <div>
                <label>Nombre de usuario:</label>
                <input
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username} />
              </div>
              <div>
                <label>Contraseña:</label>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password} />
              </div>
              {
                error && <p className="text-red-500 text-center font-bold mt-2">{error}</p>
              }
              <button>Ingresar</button>
            </form>
          </section>
        </div>
      </div>
    </Layout>
  )
}

export { Login }