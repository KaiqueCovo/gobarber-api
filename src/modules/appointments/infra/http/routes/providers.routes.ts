import { Router } from 'express'

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
  providerDayAvailabilityController.index,
)
providersRouter.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityController.index,
)

export default providersRouter