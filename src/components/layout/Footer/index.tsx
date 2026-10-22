// Components
import * as Components from './components'

function Footer() {

  return (
    <footer className="relative flex flex-col bg-neutral mt-auto px-4 py-6 pb-12 md:px-0 md:pb-6 md:min-h-[24vh]">
      <span className="text-neutral-content text-sm font-[Ubuntu Sans] text-bold text-center m-auto md:text-lg md:tracking-[.4rem] lg:text-xl">Developed by City of Franklin Information Technology</span>
      <Components.DocsBtn />
    </footer>
  )
}
export default Footer
