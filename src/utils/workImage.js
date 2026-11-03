// srcSet das fotos do portfólio: <slug>-sm.jpg (lado maior ~900px) e <slug>-lg.jpg (lado maior ~1600px)
export const workImageSrcSet = ({ slug, width, smWidth }) =>
  `/portfolio/${slug}-sm.jpg ${smWidth}w, /portfolio/${slug}-lg.jpg ${width}w`
