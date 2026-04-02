import icon from '@/assets/icons/loading/loading.svg'

function Loading() {
  
  return (
    <div className="pointer-events-none fixed inset-0 flex items-center justify-center">
      <img src={icon} alt="loading icon" className="w-24 animate-pulse lg:w-40" />
    </div>
  )
}

export default Loading