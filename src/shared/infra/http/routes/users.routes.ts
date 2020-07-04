import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '../configs/upload'

import AuthMiddleware from '../middlewares/AuthMiddleware'

import CreateUserService from '../services/CreateUserService'
import UpdateUserAvatarService from '../services/UpdateUserAvatarService'

const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body

  /**
   * Service user instance
   */
  const createUser = new CreateUserService()

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
    const updateAvatar = new UpdateUserAvatarService()

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
