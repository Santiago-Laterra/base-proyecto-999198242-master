const Footer = () => {
  return (
    <footer className="bg-amber-900 text-orange-100 py-6 mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 items-center text-center gap-4 md:gap-0">

        {/* Izquierda */}
        <div className="text-center text-sm md:text-left"> Desarrollado por&nbsp;
          <a href="https://www.linkedin.com/in/santiago-laterra-003511323/" className="hover:text-orange-200 transition"
            target="_blank">@Santiago Laterra</a>
        </div>

        {/* centro */}
        <div className="space-x-4 text-sm">
          <a href="https://github.com/Santiago-Laterra"
            className="hover:underline hover:text-orange-400 transition">Github</a>
          <a href="#"
            className="hover:underline hover:text-orange-400 transition">Terminos</a>
          <a href="#"
            className="hover:underline hover:text-orange-400 transition">Privacidad</a>
        </div>

        {/* Derecha */}
        <div className="text-sm md:text-right">
          ©2025 Proyecto UTN. Todos los derechos reservados
        </div>
      </div>
    </footer>
  )
}

export { Footer }