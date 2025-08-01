import { useState } from "react"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/UserContext"
import { useNavigate } from "react-router-dom"


const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { register } = useAuth();
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const navigate = useNavigate()


  const handleSubmit = async (e) => {

    e.preventDefault()
    setError("")
    setSuccess("")

    //validaciones, una vez pasada crea el usuario en la api
    if (!username && !email && !password) {
      setError("Debes completar todos los campos")
      return
    }
    if (!username) {
      setError("Debes completar con el nombre de usuario");
      return
    }
    if (username.length <= 3) {
      setError("El nombre debe tener al menos 3 caracteres")
      return
    }
    if (!email) {
      setError("Debes completar con un email valido")
      return
    }
    if (!password) {
      setError("Debes completar la contraseña con una valida")
      return
    }


    //conectar el registro con la base de datos
    const isRegister = await register(username, password, email)
    console.log(isRegister)

    if (isRegister) {
      setSuccess("Usuario registrado con éxito")

      //reset de formulario
      setUsername("")
      setEmail("")
      setPassword("")

      //despues de 3 s se borra el mensaje de exito.
      setTimeout(() => {
        setSuccess("")
        navigate("/")
      }, 1500)
    }
  }

  return (
    <Layout>
      <h1>Registrate</h1>

      <section>
        <h2>Hola, bienvenido</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div>
            <label>Correo electrónico:</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button>Ingresar</button>
        </form>
        {
          error && <p style={{ color: "red" }}>{error}</p>
        }
        {
          success && <p style={{ color: "green" }}>{success}</p>
        }
      </section>
    </Layout>
  )
}

export { Register }