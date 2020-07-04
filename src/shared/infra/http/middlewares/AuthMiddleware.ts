import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import AppError from '../errors/AppError'

import authConfig from '../configs/auth'

interface TokenPayload {
  iat: number
  exp: number
  sub: string
}

function AuthMiddleware(req: Request, res: Response, next: NextFunction): void {
  /**
   * Get token from header
   */
  const authHeader = req.headers.authorization

  /**
   * Check if token exits
   */
  if (!authHeader) {
    throw new AppError('JWT Token is missing', 401)
  }

  /**
   * Token destructuring from header
   */
  const [, token] = authHeader.split(' ')

  try {
    /**
     * Token decode
     */
    const decoded = verify(token, authConfig.secret)

    const { sub } = decoded as TokenPayload

    req.user = {
      id: sub,
    }

    return next()
  } catch {
    throw new AppError('Invalid JWT Token', 401)
  }
}

export default AuthMiddleware
