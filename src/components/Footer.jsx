const Footer = () => {
  return (
    <footer className="bg-amber-900 text-orange-100 py-6 mt-10">
      <div className="flex flex-col flex-row justify-between items-center px-6">
        {/* Izquierda */}
        <div className="text-center text-sm"> Desarrollado por&nbsp;
          <a href="https://www.linkedin.com/in/santiago-laterra-003511323/" className="hover:text-orange-200 transition"
            target="_blank">@Santiago Laterra</a>
        </div>
        {/* centro */}
        <div className="space-x-4">
          <a href="#">Github</a>
          <a href="#">Terminos y Condiciones</a>
          <a href="#">Privacidad</a>
        </div>
        {/* Derecha */}
        <div>
          © 2025 Proyecto UTN. Todos los derechos reservados
        </div>
      </div>
    </footer>
  )
}

export { Footer }