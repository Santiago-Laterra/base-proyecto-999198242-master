import { Layout } from "../components/Layout";

const Nosotros = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
          Bienvenidos a Nosotros
        </h1>
        <section className="space-y-8">
          <div className="bg-white shadow-md/30 p-6 rounded-xl">
            <h2>
              ¿De qué trata el proyecto?
            </h2>
            <p>
              Este proyecto es una simulación de una tienda online, desarrollada como trabajo práctico integrador para la materia de Nuevos Escenarios en la carrera de Licenciatura en Sistemas. Su objetivo es aplicar conocimientos de React, diseño responsivo y consumo de APIs externas para construir una aplicación web funcional y moderna.
            </p>
          </div>

          <div className="bg-white shadow-md/30 p-6 rounded-xl">
            <h2>
              ¿A quién está dirigido?
            </h2>
            <p>
              El proyecto está dirigido a estudiantes, docentes y personas interesadas en el desarrollo frontend con tecnologías modernas. También es útil como base para quienes buscan entender cómo estructurar una aplicación React completa, con manejo de usuarios, rutas protegidas y componentes reutilizables.
            </p>
          </div>

          <div className="bg-white shadow-md/30 p-6 rounded-xl">
            <h2>
              ¿Qué tecnologías o enfoques se usaron?
            </h2>
            <ul>
              <li>
                <strong>Frontend:</strong> La aplicación fue desarrollada con React, utilizando React Router para la navegación entre rutas.
              </li>
              <li>
                <strong>Estilos:</strong> Se empleó Tailwind CSS para lograr un diseño moderno y responsive, manteniendo una estructura limpia y reutilizable.
              </li>
              <li>
                <strong>APIs:</strong> Se integró FakeStoreAPI para simular funcionalidades reales como el registro de usuarios y la gestión de productos.
              </li>
              <li>
                <strong>Enfoques:</strong> Se aplicaron buenas prácticas como el uso de componentes funcionales, Context API para el manejo de estado global y validaciones en formularios mediante hooks.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export { Nosotros };
