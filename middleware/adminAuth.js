import jwt from 'jsonwebtoken'

const adminAuth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')

  if (!token) {
    return res.status(401).json({ message: 'Accès refusé. Token manquant.' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.admin = decoded
    next()
  } catch (error) {
    res.status(400).json({ message: 'Token invalide.' })
  }
}

export default adminAuth