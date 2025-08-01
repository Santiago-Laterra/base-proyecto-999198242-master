import { useState } from "react"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/UserContext"

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { register } = useAuth();

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

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
    if (!email) {
      setEmail("Debes completar con un email valido")
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
    }

    const newUser = {
      username,
      email,
      password
    }

    //reset de formulario
    setSuccess("")
    setError("")
    setUsername("")
    setEmail("")
    setPassword("")
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