import 'reflect-metadata'
import express, { Request, Response, NextFunction, response } from 'express'
import cors from 'cors'
import { errors } from 'celebrate'
import 'express-async-errors'

import routes from './routes'

import AppError from '@shared/errors/AppError'

import uploadConfig from '@configs/upload'

import '@shared/infra/typeorm'
import '@shared/container'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/files', express.static(uploadConfig.tmpFolder))
app.use(routes)

app.use(errors())

/**
 * Global exception handler
 */
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    })
  }

  console.log(error)
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
})

app.listen(3333, () => console.log('Back-end Start'))
