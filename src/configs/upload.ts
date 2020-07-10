import multer from 'multer'
import crypto from 'crypto'
import { resolve } from 'path'

const tmpFolder = resolve(__dirname, '..', '..', 'tmp')
export default {
  tmpFolder,
  uploadsFolder: resolve(tmpFolder, 'uploads'),
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (req, file, callback) => {
      const fileHash = crypto.randomBytes(8).toString('HEX')

      const fileName = `${fileHash}-${file.originalname}`

      return callback(null, fileName)
    },
  }),
}
