import { createContext, useContext, useState } from "react"

const UserContext = createContext()

const UserProvider = (props) => {
  const [user, setUser] = useState(null)

  const login = async (username, password) => {
    // realizar una petición al backend 
    const response = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    })

    if (response.ok) {
      const token = await response.json()
      setUser(true)
      return token
    } else {
      return false
    }
  }

  const logout = () => {
    setUser(null)
  }


  const register = async (username, password, email) => {

    //realizar una peticion al back 
    const response = await fetch("https://fakestoreapi.com/users", {

      method: "POST",
      headers: { //informacion extra 
        "Content-Type": "application/json"

      },
      body: JSON.stringify({ username, password, email }) //cuerpo del mensaje
      //se lo pasamos en un formato valido por eso lo transformamos
    })

    if (response.ok) {

      //recibe la data la informacion del usuario creado, si es que se valido
      const data = await response.json()
      console.log(data);
      setUser(true)
      return data
    } else {
      return false
    }

  }

  return (
    <UserContext.Provider value={{ login, logout, register, user }}>
      {props.children}
    </UserContext.Provider>
  )
}

const useAuth = () => useContext(UserContext)

export { UserProvider, useAuth }