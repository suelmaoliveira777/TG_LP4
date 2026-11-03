// Reduz uma foto antes do envio: lado maior até MAX_SIDE px, em JPEG. Uma foto de telemóvel
// (3 a 8 MB) fica com cerca de 200 a 500 KB, o que torna o envio rápido mesmo com rede móvel.
const MAX_SIDE = 1600
const QUALITY = 0.8

export async function compressImage(file) {
  // Rejeita se o navegador não conseguir ler o formato (ex.: HEIC fora do Safari)
  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(bitmap.width * scale)
  canvas.height = Math.round(bitmap.height * scale)
  canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  bitmap.close()

  const blob = await new Promise((resolve, reject) =>
    canvas.toBlob((result) => (result ? resolve(result) : reject(new Error('Falha ao comprimir'))), 'image/jpeg', QUALITY),
  )
  const name = file.name.replace(/\.[^.]+$/, '') + '.jpg'
  return new File([blob], name, { type: 'image/jpeg' })
}
