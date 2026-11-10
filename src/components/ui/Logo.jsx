import { cn } from '@/lib/utils'
import logo320 from '@/assets/brand/logo-tiago-gago-320.webp'
import logo640 from '@/assets/brand/logo-tiago-gago-640.webp'

// Dimensões reais da logo (sem margem): reservam o espaço antes de a imagem carregar
const WIDTH = 1433
const HEIGHT = 586

// Logo da marca. A altura vem do className (ex.: h-10); a largura segue a proporção.
// O original sem compressão está em assets/brand/logo-tiago-gago.png.
function Logo({ className, sizes = '240px', ...props }) {
  return (
    <img
      src={logo640}
      srcSet={`${logo320} 320w, ${logo640} 640w`}
      sizes={sizes}
      width={WIDTH}
      height={HEIGHT}
      alt="Tiago Gago Luthier"
      decoding="async"
      draggable={false}
      className={cn('block w-auto select-none', className)}
      {...props}
    />
  )
}

export default Logo
