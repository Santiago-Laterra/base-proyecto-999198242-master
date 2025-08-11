import { useState } from "react"
import { Layout } from "../components/Layout"

const Dashboard = () => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [product, setProduct] = useState(null)
  const [error, setError] = useState(null)



  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!name && !price && !description) {
      setError("Debes completar los campos, nombre, precio y descripcion")
      setTimeout(() => {
        setError("")
      }, 1500)
      return
    }
    if (!name) {
      setError("Debes completar el nombre del producto")
      setTimeout(() => {
        setError("")
      }, 1500)
      return
    }
    if (!description) {
      setError("Debes completar la descripcion del producto")
      setTimeout(() => {
        setError("")
      }, 1500)
      return
    }
    if (!price) {
      setError("Debes completar el precio del producto")
      setTimeout(() => {
        setError("")
      }, 1500)
      return
    }
    if (name.length < 3) {
      setError("El nombre debe tener al menos 4 caracteres")
      setTimeout(() => {
        setError("")
      }, 1500)
      return
    }

    const newProduct = {
      id: crypto.randomUUID(),
      title: name,
      price: price,
      description: description,
      category: "",
      image: ""
    }

    // petición al backend mediante fetch -> método POST https://fakeproductapi.com/products
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProduct)
    })

    const data = await response.json()
    setProduct(data)
    setName("")
    setPrice("")
    setDescription("")
  }

  return (
    <Layout>
      <h1 className="text-4xl text-center font-bold mt-5 text-amber-700">Panel de Administración</h1>
      <p className="text-orange-300 text-center mt-2">Gestiona tus productos!!</p>
      <div className="flex items-center justify-center py-10 px-4 min-h-[80vh]">
        <div className="w-full max-w-md bg-amber-100 p-8 rounded-xl shadow-md">
          <section>
            <form onSubmit={handleSubmit}
              className="space-y-4">
              <h2 className="text-2xl">Cargar nuevo producto</h2>
              <div>
                <label>Nombre del producto:</label>
                <input type="text" name="nombre"
                  placeholder="EJ: Manzana"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="w-full px-4 py-2 border border-orange-900 rounded-lg" />
              </div>

              <div>
                <label>Precio:</label>
                <input type="number" name="precio"
                  placeholder="EJ: 100"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  className="w-full px-4 py-2 border border-orange-900 rounded-lg" />
              </div>

              <div>
                <label>Descripción:</label>
                <textarea name="descripcion" rows="4"
                  placeholder="Descripcion:"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  className="w-full px-4 py-2 border border-orange-900 rounded-lg" />
              </div>
              {
                error && <p className="text-red-500 text-center font-bold mt-2">{error}</p>
              }
              <button className="py-2 px-4 bg-amber-800 text-white rounded-lg hover:bg-amber-900 transition text-center w-full">Guardar producto</button>
            </form>
          </section>
        </div>
      </div>

    </Layout>
  )
}

export { Dashboard }
