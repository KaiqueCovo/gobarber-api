import fs from 'fs'
import { resolve } from 'path'

/** Model */
import IStorageProvider from '../models/InterfaceStorageProvider'

/** Confgis */
import uploadConfig from '@configs/upload'

class DiskStorage implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      resolve(uploadConfig.tmpFolder, file),
      resolve(uploadConfig.uploadsFolder, file),
    )

    return file
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = resolve(uploadConfig.uploadsFolder, file)

    try {
      await fs.promises.stat(filePath)

      await fs.promises.unlink(filePath)
    } catch (error) {}
  }
}

export default DiskStorage
