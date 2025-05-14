import multer from 'multer'
import path from 'path'
import fs from 'fs'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'temp_uploads/'
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir)
    }
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    )
  },
})

const fileFilter = (req: any, file: any, cb: any) => {
  const fileTypes = /jpeg|jpg|png|gif/
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = fileTypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb(new Error('Only image files are allowed (jpg, jpeg, png, gif)'))
  }
}

export const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter,
})
