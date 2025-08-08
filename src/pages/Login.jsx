import { useState } from "react"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/UserContext"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

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
      <div className="flex items-center justify-center py-10 px-4 min-h-[80vh]">
        <div className="w-full max-w-md bg-amber-100 p-8 rounded-xl shadow-md">
          <h1 className="text-center font-bold text-amber-800 mb-1 text-3xl">
            Inicia sesión</h1>
          <h2 className="text-center font-medium text-amber-500 mb-6">
            Bienvenido a nuestra tienda</h2>
          <section>
            <div className="mb-6">
              <div>
                <p className="font-bold">Credenciales de prueba:</p>
                <p><span className="font-bold">Usuario:</span>johnd</p>
                <p><span className="font-bold">Contraseña:</span>m38rmF$</p>
              </div>
            </div>
            <form onSubmit={handleLogin}>
              <div className="space-y-6">
                <div>
                  <label>Nombre de usuario:</label>
                  <input
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    className="w-full px-4 py-2 border border-orange-900 rounded-lg" />
                </div>
                <div>
                  <label >Contraseña:</label>
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="w-full px-4 py-2 border border-orange-900 rounded-lg" />
                </div>
              </div>
              {
                error && <p className="text-red-500 text-center font-bold mt-2">{error}</p>
              }
              <button className="py-2 px-4 mt-6 bg-amber-800 text-white rounded-lg hover:bg-amber-900 transition text-center w-full">Ingresar</button>
            </form>
          </section>
          <hr className="mt-10 mb-10" />
          <p className="text-[#6b7280] text-center font-semibold">¿No tienes una cuenta? <span className="text-sky-600"><Link to="/registrate" className="hover:underline">Registrate</Link></span></p>
        </div>
      </div>
    </Layout >
  )
}

export { Login }