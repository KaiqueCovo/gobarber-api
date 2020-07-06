import { Router } from 'express'
import multer from 'multer'

/* Middlewares */
import AuthMiddleware from '../middlewares/AuthMiddleware'

/* Controllers */
import UsersController from '../controllers/UsersController'
import UserAvatarController from '../controllers/UserAvatarController'

/* Configs */
import uploadConfig from '@configs/upload'

const usersRouter = Router()
const upload = multer(uploadConfig)

const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

usersRouter.post('/', usersController.create)

usersRouter.post(
  '/avatar',
  AuthMiddleware,
  upload.single('avatar'),
  userAvatarController.update,
)
export default usersRouter
