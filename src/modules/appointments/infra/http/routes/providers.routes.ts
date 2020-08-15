import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

/* Middlewares */
import AuthMiddleware from '@modules/users/infra/http/middlewares/AuthMiddleware'

/* Controllers */
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController'
import ProviderDayAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderDayAvailabilityController'
import ProviderMonthAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderMonthAvailabilityController'

const providersRouter = Router()
const providersController = new ProvidersController()
const providerDayAvailabilityController = new ProviderDayAvailabilityController()
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController()

providersRouter.use(AuthMiddleware)

providersRouter.get('/', providersController.index)
providersRouter.get(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerDayAvailabilityController.index,
)
providersRouter.get(
  '/:provider_id/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerMonthAvailabilityController.index,
)

export default providersRouter
