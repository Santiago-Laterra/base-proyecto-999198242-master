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
        <div className="flex space-x-4 text-base">
          <a href="https://github.com/Santiago-Laterra"
            className="hover:undereline hover:text-orange-400 transition">Github</a>
          <a href="#"
            className="hover:undereline hover:text-orange-400 transition">Terminos</a>
          <a href="#"
            className="hover:undereline hover:text-orange-400 transition">Privacidad</a>
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