import { useState } from "react";
import { Layout } from "../components/Layout";


const Nosotros = () => {


  return (

    <Layout>
      <h1>Bienvenidos a Nosotros!!</h1>
      <section>
        <div>
          <h2>¿De qué trata el proyecto?</h2>
          <p>Este proyecto es una simulación de una tienda online, desarrollada como trabajo práctico integrador para la materia de Nuevos Escenarios en la carrera de Licenciatura en Sistemas. Su objetivo es aplicar conocimientos de React, diseño responsivo y consumo de APIs externas para construir una aplicación web funcional y moderna.</p>
        </div>
        <div>
          <h2>¿A quién está dirigido?</h2>
          <p>El proyecto está dirigido a estudiantes, docentes y personas interesadas en el desarrollo frontend con tecnologías modernas. También es útil como base para quienes buscan entender cómo estructurar una aplicación React completa, con manejo de usuarios, rutas protegidas y componentes reutilizables.</p>
        </div>
        <div>
          <h2>¿Qué tecnologías o enfoques se usaron?</h2>
          <p>Se utilizó React como librería principal para la interfaz, junto con React Router para la navegación entre páginas. Tailwind CSS fue empleado para los estilos y diseño responsivo. Además, se integró la FakeStoreAPI para simular operaciones reales como registro de usuarios y listado de productos. Se siguieron buenas prácticas como el uso de contexto global para el manejo del estado del usuario.</p>
        </div>
      </section>




    </Layout>



  )



}

export { Nosotros }
