import { Router } from 'express'
import { container } from 'tsyringe'
import multer from 'multer'

/* Middlewares */
import AuthMiddleware from '../middlewares/AuthMiddleware'

/* Services */
import CreateUserService from '@modules/users/services/CreateUserService'
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'

/* Configs */
import uploadConfig from '@configs/upload'

const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body

  /**
   * Service user instance
   */
  const createUser = container.resolve(CreateUserService)

  /**
   * Execute method for create user
   */
  const user = await createUser.execute({ name, email, password })

  return res.json(user)
})

usersRouter.post(
  '/avatar',
  AuthMiddleware,
  upload.single('avatar'),
  async (req, res) => {
    const { filename } = req.file
    const { id } = req.user

    /**
     * Service update avatar instance
     */
    const updateAvatar = container.resolve(UpdateUserAvatarService)

    /**
     * Execute method for update avatar
     */
    const user = await updateAvatar.execute({
      user_id: id,
      avatarName: filename,
    })

    return res.json(user)
  },
)
export default usersRouter
