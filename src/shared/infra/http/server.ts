import express, { Request, Response, NextFunction, response } from 'express'
import cors from 'cors'
import 'express-async-errors'

import routes from './routes'

import AppError from './errors/AppError'

import { directory } from './configs/upload'

import './database'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/files', express.static(directory))
app.use(routes)

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
