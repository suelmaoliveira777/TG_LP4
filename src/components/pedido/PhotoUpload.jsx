import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ImagePlus, LoaderCircle, X } from 'lucide-react'
import { compressImage } from '@/utils/compressImage'
import { MAX_PHOTOS } from './fields'

// Fotos do instrumento: arrastar e largar ou escolher, até MAX_PHOTOS, comprimidas no navegador.
// photos: [{ id, file, url }]
function PhotoUpload({ id, label, photos, onChange }) {
  const [dragging, setDragging] = useState(false)
  const [processing, setProcessing] = useState(0)
  const [error, setError] = useState(null)
  const remaining = MAX_PHOTOS - photos.length - processing

  // Liberta as pré-visualizações quando o componente sai
  const photosRef = useRef(photos)
  photosRef.current = photos
  useEffect(() => () => photosRef.current.forEach((photo) => URL.revokeObjectURL(photo.url)), [])

  const addFiles = async (fileList) => {
    setError(null)
    const files = [...fileList].filter((file) => file.type.startsWith('image/'))
    if (files.length < fileList.length) setError('Só são aceites imagens (JPG, PNG, WebP).')
    const accepted = files.slice(0, Math.max(0, remaining))
    if (files.length > accepted.length) setError(`Podes enviar até ${MAX_PHOTOS} fotos.`)
    if (!accepted.length) return

    setProcessing((count) => count + accepted.length)
    const results = await Promise.allSettled(accepted.map(compressImage))
    setProcessing((count) => count - accepted.length)

    const added = results
      .filter((result) => result.status === 'fulfilled')
      .map((result) => ({ id: crypto.randomUUID(), file: result.value, url: URL.createObjectURL(result.value) }))
    if (added.length < accepted.length) setError('Não foi possível ler uma das fotos. Experimenta em JPG ou PNG.')
    onChange((current) => [...current, ...added].slice(0, MAX_PHOTOS))
  }

  const remove = (photo) => {
    URL.revokeObjectURL(photo.url)
    onChange((current) => current.filter((item) => item.id !== photo.id))
  }

  return (
    <fieldset>
      <legend className="mb-2 flex w-full items-baseline justify-between gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-text/75">
        <span>{label}</span>
        <span className="text-[0.72rem] font-normal normal-case tracking-normal text-muted">
          Opcional · até {MAX_PHOTOS}
        </span>
      </legend>

      {remaining > 0 && (
        <label
          htmlFor={id}
          onDragOver={(event) => {
            event.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault()
            setDragging(false)
            addFiles(event.dataTransfer.files)
          }}
          className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-7 text-center transition duration-300 ${
            dragging ? 'border-gold-light bg-gold-light/10' : 'border-white/15 bg-white/[0.02] hover:border-gold-light/50 hover:bg-white/[0.04]'
          }`}
        >
          <ImagePlus className="h-6 w-6 text-gold-light" strokeWidth={1.5} aria-hidden="true" />
          <span className="text-sm text-text/80">
            <span className="font-semibold text-gold-pale">Escolhe fotos</span> ou arrasta-as para aqui
          </span>
          <span className="text-xs text-muted">Mostra o instrumento inteiro e o pormenor do problema</span>
          <input
            id={id}
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={(event) => {
              addFiles(event.target.files)
              event.target.value = ''
            }}
          />
        </label>
      )}

      {(photos.length > 0 || processing > 0) && (
        <ul className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
          <AnimatePresence initial={false}>
            {photos.map((photo, index) => (
              <motion.li
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative aspect-square overflow-hidden rounded-lg border border-white/10"
              >
                <img src={photo.url} alt={`Foto ${index + 1} do instrumento`} className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => remove(photo)}
                  aria-label={`Remover foto ${index + 1}`}
                  className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-bg/80 text-text backdrop-blur transition hover:text-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
          {Array.from({ length: processing }, (_, index) => (
            <li key={`a-processar-${index}`} className="flex aspect-square items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
              <LoaderCircle className="h-5 w-5 animate-spin text-gold-light" aria-label="A preparar a foto" />
            </li>
          ))}
        </ul>
      )}

      {error && (
        <p role="alert" className="mt-2 text-sm text-red-300">
          {error}
        </p>
      )}
    </fieldset>
  )
}

export default PhotoUpload
