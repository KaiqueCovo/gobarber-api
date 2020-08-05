import { Router } from 'express'
import multer from 'multer'

/* Middlewares */
import AuthMiddleware from '../middlewares/AuthMiddleware'

/* Controllers */
import ProfileController from '../controllers/ProfileController'

const profileRouter = Router()

const profileController = new ProfileController()

profileRouter.use(AuthMiddleware)

profileRouter.put('/', profileController.update)
profileRouter.get('/', profileController.show)

export default profileRouter
