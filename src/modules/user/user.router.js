import  {auth} from '../../middleware/auth.js'
import { fileUpload, fileValidation } from '../../utils/multer.cloud.js'
import * as userController from './controller/user.js'
import {Router} from "express"
const router = Router()

router.get('/',auth,  userController.getUserProfile)
router.patch('/profile/image', auth, fileUpload( fileValidation.image).single("image"), userController.changeProfilePic)
router.patch('/profile/cover/image', auth, fileUpload( fileValidation.image).array("image", 3), userController.changeCoverPic)

export default router