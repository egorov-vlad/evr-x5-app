import { createUser, getUserById } from '../../controllers/user';
import { validateGetUser, validateCreateUser } from '../../middlewares/validator';
import { Router } from 'express';

const router = Router();

/**
 * @openapi
 * /user/:id:
 *   get:
 *    tags: [User]
 *    description: Get user by chat id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: User chat id
 *        schema:
 *          type: number
 *          required: true
 *    responses:
 *      200:
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user:
 *                  type: object
 *                  properties:
 *                    firstName: 
 *                      type: string
 *                      description: User first name
 *                    lastName:
 *                      type: string
 *                      description: User last name
 *                    avatarUrl:
 *                      type: string
 *                      description: User avatar url
 *                    modelUrl: 
 *                      type: string
 *                      description: User model url
 *                    rpmId:
 *                      type: string
 *                      description: User rpm id
 *                    chatId:
 *                      type: number
 *                      description: User chat id
 *                    _id:
 *                      type: string
 *                      description: User id
 * 
 *      404:
 *        description: User not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Error message
 *      500:
 *        description: Internal server error
 * 
 *  
 */
router.get('/:id', validateGetUser, getUserById);

/**
 * @openapi
 * /user:
 *   post:
 *    tags: [User]
 *    description: Create user
 *    parameters: 
 *    - in: body
 *      name: user
 *      required: true
 *      description: User object
 *      schema:
 *        type: object,
 *        properties:
 *          chatId:
 *            type: number
 *            description: User chat id
 *            required: true
 *          firstName:
 *            type: string
 *            description: User first name
 *            required: true
 *          lastName:
 *            type: string
 *            description: User last name
 *            required: true
 *          avatarUrl:
 *            type: string
 *            description: User avatar url
 *          modelURL: 
 *            type: string
 *            description: User model url
 *          rpmId: 
 *            type: string
 *            description: RPM id after create model
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              user:
 *                type: object
 *                properties:
 *                  chatId:
 *                    type: number
 *                    description: User chat id
 *                  firstName:
 *                    type: string
 *                    description: User first name
 *                  lastName:
 *                    type: string
 *                    description: User last name
 *                  avatarUrl:
 *                    type: string
 *                    description: User avatar url
 *                  modelUrl:
 *                    type: string
 *                    description: User model url
 *                  rpmId:
 *                    type: string
 *                    description: RPM id after create model
 *    responses:
 *      201:
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user:
 *                  type: object
 *                  properties:
 *                    firstName: 
 *                      type: string
 *                      description: User first name
 *                    lastName:
 *                      type: string
 *                      description: User last name
 *                    avatarUrl:
 *                      type: string
 *                      description: User avatar url
 *                    modelUrl: 
 *                      type: string
 *                      description: User model url
 *                    rpmId:
 *                      type: string
 *                      description: User rpm id
 *                    chatId:
 *                      type: number
 *                      description: User chat id
 *                    _id:
 *                      type: string
 *                      description: User id
 *      400:
 *        description: User already exists
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Error message
 *      500:
 *        description: Internal server error
 * 
 */
router.post('/', validateCreateUser, createUser);


export default router;