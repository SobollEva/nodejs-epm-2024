import express from 'express';
import { schemaCreateUser, schemaUpdateUser } from '../services/validation.schemas';
import { validationMiddleware } from '../services/validation.middleware'
import { userController } from '../user/user.controller';

const router: express.Router = express.Router();

router.route('/user/:userId')
    .get(userController.getUser)
    .delete(userController.deleteUser)
    .patch(validationMiddleware(schemaUpdateUser), userController.updateUser);

router.route('/user')
    .post(validationMiddleware(schemaCreateUser), userController.createUser)
    .get(userController.getUserList);

export default router;