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
        <h1>Bienvenido a Nuestra Tienda</h1>
        <p>Descubrí una selección exclusiva de productos para vos. Calidad, confianza y atención personalizada.</p>
      </section>

      <section>
        <h2>¿Por qué elegirnos?</h2>
        <ul>
          <li>
            <h3>Envíos a todo el país</h3>
            <p>Recibí tu compra en la puerta de tu casa estés donde estés.</p>
          </li>
          <li>
            <h3>Pagos seguros</h3>
            <p>Trabajamos con plataformas que garantizan tu seguridad.</p>
          </li>
          <li>
            <h3>Atención personalizada</h3>
            <p>Estamos disponibles para ayudarte en todo momento.</p>
          </li>
        </ul>
      </section>

      <section>
        <h2>Nuestros productos</h2>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 m-2">
          {
            //validacion para que no me muestre nada
            searchWord.trim() === ""
              ? null                                                   //uso includes para hacer la busqueda parcial
              : products.filter((producto) => producto.title.toLowerCase().includes(searchWord.toLowerCase())).map(product => (
                //muestro en la UI
                <div key={product.id}
                  className="bg-white border rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg transition-shadow">

                  <img width="50px"
                    src={product.image}
                    alt={`Imagen de ${product.title}`}
                    className="w-20 h-20 object-contain mb-2" />
                  <h2 key={product.id}
                    className="text-lg font-semibold text-center truncate w-full">
                    {product.title}</h2>
                  <p className="text-orange-800 font-bold mt-1">${product.price}</p>
                </div>
              ))
          }
        </div>

        {
          showPopup && <section className="popup-edit">
            <h2>Editando el producto.</h2>
            <button onClick={() => setShowPopup(null)}>Cerrar</button>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                placeholder="Ingrese el titulo"
                value={titleEdit}
                onChange={(e) => setTitleEdit(e.target.value)}
              />
              <input
                type="number"
                placeholder="Ingrese el precio"
                value={priceEdit}
                onChange={(e) => setPriceEdit(e.target.value)}
              />
              <textarea
                placeholder="Ingrese la descripción"
                value={descriptionEdit}
                onChange={(e) => setDescriptionEdit(e.target.value)}
              ></textarea>
              <input
                type="text"
                placeholder="Ingrese la categoria"
                value={categoryEdit}
                onChange={(e) => setCategoryEdit(e.target.value)}
              />
              <input
                type="text"
                placeholder="Ingrese la URL de la imagen"
                value={imageEdit}
                onChange={(e) => setImageEdit(e.target.value)}
              />
              <button>Guardar Cambios</button>
            </form>
          </section>
        }

        <div className="grid grid-cols-4 gap-4">
          {
            products.map((product) =>
              <div className="flex justify-center py-10 px-4 min-h-[80vh]">
                <div className="w-full max-w-md rounded-xl shadow-md border border-yellow-900">
                  <div key={product.id}>
                    <div className="flex w-ful h-full max-w-md bg-amber-100 rounded-xl items-center justify-center">
                      <img width="80px" src={product.image}
                        alt={`Imagen de ${product.title}`} />
                    </div>
                    <div className="flex p-[1.5rem] flex-col">
                      <h2 className="font-bold text-amber-800 p-4"
                        key={product.id}>{product.title}</h2>
                      <p>${product.price}</p>
                      <p>{product.description}</p>
                      <p><strong>{product.category}</strong></p>
                    </div>
                    {
                      user && <div>
                        <button onClick={() => handleOpenEdit(product)}>Editar</button>
                        <button onClick={() => handleDelete(product.id)}>Borrar</button>
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
