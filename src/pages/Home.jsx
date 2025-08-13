import { useEffect, useState } from "react"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/UserContext"

const Home = () => {


  const [products, setProducts] = useState([])
  const [showPopup, setShowPopup] = useState(null)
  const [productToEdit, setProductToEdit] = useState(null)
  const [titleEdit, setTitleEdit] = useState("")
  const [priceEdit, setPriceEdit] = useState("")
  const [descriptionEdit, setDescriptionEdit] = useState("")
  const [categoryEdit, setCategoryEdit] = useState("")
  const [imageEdit, setImageEdit] = useState("")
  const [searchWord, setSearchword] = useState("")


  // simulando existencia del usuario, proximamente este estado será global
  const { user } = useAuth()

  const fetchingProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products", { method: "GET" })
    const data = await response.json()
    setProducts(data)
  }

  // El array vacío (dependencias) espera a que ejecute el return del jsx. Si tiene algo, useEffect se va a ejecutar cada vez que se modifique lo que este dentro de la dependencia.
  useEffect(() => {
    fetchingProducts()
  }, [])

  const handleDelete = async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, { method: "DELETE" })

    if (response.ok) {
      setProducts(prevProduct => prevProduct.filter((product) => product.id != id))
      // fetchingProducts()
    }
  }

  const handleOpenEdit = (product) => {
    setShowPopup(true)
    setProductToEdit(product)
    setTitleEdit(product.title)
    setPriceEdit(product.price)
    setDescriptionEdit(product.description)
    setCategoryEdit(product.category)
    setImageEdit(product.image)
  }

  // petición al backend mediante fetch para modificar-> método PATCH / PUT https://fakeproductapi.com/products
  const handleUpdate = async (e) => {
    e.preventDefault()

    const updatedProduct = {
      id: productToEdit.id,
      title: titleEdit,
      price: Number(priceEdit),
      description: descriptionEdit,
      category: categoryEdit,
      image: imageEdit
    }

    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productToEdit.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedProduct)
      })

      if (response.ok) {
        const data = await response.json()
        setProducts(prevProduct =>
          prevProduct.map((product) =>
            product.id === productToEdit.id
              ? data
              : product
          ))
        // fetchingProducts()
      }
      setShowPopup(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout>
      <section>
        <h1 className="text-center text-4xl mt-8 text-amber-800 font-bold">Bienvenido a Nuestra Tienda</h1>
        <p
          className="text-center text-orange-600/60 mt-2">Descubrí una selección exclusiva de productos para vos. Calidad, confianza y atención personalizada.
        </p>
      </section>

      <section>
        <h2 className="text-center text-4xl mt-8 font-semibold text-amber-800">
          ¿Por qué elegirnos?
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-5 mt-8">
          <div className="bg-amber-100 border rounded-lg p-4 flex flex-col items-center  text-center shadow-md hover:shadow-lg transition-shadow">
            <li className="flex flex-col justify-center items-center">
              <h3 className="text-[20px] font-semibold text-amber-800 mb-2">
                Envíos a todo el país
              </h3>
              <p className="text-gray-600">
                Recibí tu compra en la puerta de tu casa estés donde estés.
              </p>
            </li>
          </div>
          <div className="bg-amber-100 border rounded-lg p-4 flex flex-col items-center  text-center shadow-md hover:shadow-lg transition-shadow">
            <li className="flex flex-col justify-center items-center">
              <h3 className="text-[20px] font-semibold text-amber-800 mb-2">
                Pagos seguros
              </h3>
              <p className="text-gray-600">
                Trabajamos con plataformas que garantizan tu seguridad.
              </p>
            </li>
          </div>
          <div className="bg-amber-100 border rounded-lg p-4 flex flex-col items-center  text-center shadow-md hover:shadow-lg transition-shadow">
            <li className="flex flex-col justify-center items-center">
              <h3 className="text-[20px] font-semibold text-amber-800 mb-2">
                Atención personalizada
              </h3>
              <p className="text-gray-600">
                Estamos disponibles para ayudarte en todo momento.
              </p>
            </li>
          </div>
        </ul>
      </section>

      <section>
        <h2 className="text-center text-3xl text-amber-800 font-bold mt-8 mb-5">
          Nuestros productos
        </h2>
        <div className="flex flex-col items-center">
          <p className="text-center text-2xl mb-4">
            Elegí entre nuestras categorías más populares.
          </p>
          <input
            type="text"
            className="px-4 py-2 border border-orange-900 rounded-lg w-80"
            value={searchWord}
            onChange={(e) => setSearchword(e.target.value)}
          />
        </div>
        {/* div para filtrar busqueda por palabra del usuario */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 m-2">
          {
            //validacion para que no me muestre nada
            searchWord.trim() === ""
              ? null
              //uso includes para hacer la busqueda parcial
              : products.filter((producto) => producto.title.toLowerCase().includes(searchWord.toLowerCase())).map(product => (
                //muestro en la UI
                <div key={product.id}
                  className="bg-white border rounded-lg p-4 flex flex-col items-center">

                  <img
                    src={product.image}
                    alt={`Imagen de ${product.title}`}
                    className="w-15 h-15 object-contain mb-2" />
                  <h2 key={product.id}
                    className="text-md font-semibold text-center truncate w-full">
                    {product.title}</h2>
                  <p className="text-orange-800 font-bold mt-1">${product.price}</p>
                </div>
              ))
          }
        </div>

        {
          showPopup && <section id="edicion"
            className="max-w-2xl mx-auto mt-10 bg-amber-200 p-6 rounded-xl shadow-lg scroll-mt-24 ">
            <h2 className="text-2xl font-bold text-amber-800 mb-6 text-center">
              Editando el producto.
            </h2>
            <button onClick={() => setShowPopup(null)}
              className="block mb-1 text-red-500 border border-red-500 hover:bg-red-500 px-2 py-1 rounded-lg hover:text-red-50 font-semibold mb-5">
              Cerrar
            </button>
            <form onSubmit={handleUpdate} className="space-y-8">
              <input
                type="text"
                placeholder="Ingrese el titulo"
                value={titleEdit}
                onChange={(e) => setTitleEdit(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="number"
                placeholder="Ingrese el precio"
                value={priceEdit}
                onChange={(e) => setPriceEdit(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <textarea
                placeholder="Ingrese la descripción"
                value={descriptionEdit}
                onChange={(e) => setDescriptionEdit(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                rows="4"
              ></textarea>
              <input
                type="text"
                placeholder="Ingrese la categoria"
                value={categoryEdit}
                onChange={(e) => setCategoryEdit(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Ingrese la URL de la imagen"
                value={imageEdit}
                onChange={(e) => setImageEdit(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <button className="w-full py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition">
                Guardar Cambios
              </button>
            </form>
          </section>
        }

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 m-2">
          {
            products.map((product) =>
              <div className="flex justify-center py-10 px-4 min-h-[80vh]">
                <div className="w-full max-w-md rounded-xl shadow-md border border-yellow-900">
                  <div key={product.id}>
                    <div className="flex w-ful h-full max-w-md bg-amber-100 rounded-xl items-center justify-center">
                      <img
                        src={product.image}
                        alt={`Imagen de ${product.title}`}
                        className="w-40 h-40 object-contain" />
                    </div>
                    <div className="flex p-[1.5rem] flex-col space-y-3">
                      <h2
                        className="font-bold text-amber-800"
                        key={product.id}>{product.title}</h2>
                      <p className="font-bold text-2xl text-green-700">${product.price}</p>
                      <p className="truncate text-gray-900/50">{product.description}</p>
                      <p className="text-amber-500"><strong>{product.category}</strong></p>

                    </div>
                    {
                      user && <div className="flex justify-evenly">
                        <button
                          className="text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-red-50 px-2 py-1 rounded-lg"
                          onClick={() => handleOpenEdit(product)}><a href="#edicion">Editar</a></button>
                        <button
                          className="text-red-500 border border-red-500 hover:bg-red-500 px-2 py-1 rounded-lg hover:text-red-50"
                          onClick={() => handleDelete(product.id)}>Borrar</button>
                      </div>
                    }
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </section>
    </Layout >
  )
}

export { Home }
