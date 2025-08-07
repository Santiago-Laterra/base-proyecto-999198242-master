const Footer = () => {
  return (
    <footer className="bg-amber-900 text-orange-100 py-6 mt-10">
      <div className="flex flex-col flex-row justify-between items-center px-6">
        <div> Desarrollado por&nbsp;
          <a href="#">@Santiago Laterra</a>
        </div>

        <div className="space-x-4">
          <a href="#">Github</a>
          <a href="#">Terminos y Condiciones</a>
          <a href="#">Privacidad</a>
        </div>
        <div>
          © 2025 Proyecto UTN. Todos los derechos reservados
        </div>
      </div>
    </footer>
  )
}

export { Footer }