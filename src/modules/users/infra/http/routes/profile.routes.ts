import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

/* Middlewares */
import AuthMiddleware from '../middlewares/AuthMiddleware'

/* Controllers */
import ProfileController from '../controllers/ProfileController'

const profileRouter = Router()

const profileController = new ProfileController()

profileRouter.use(AuthMiddleware)

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  profileController.update,
)
profileRouter.get('/', profileController.show)

export default profileRouter
