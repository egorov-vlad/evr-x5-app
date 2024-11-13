import { Router } from 'express';
import { addNewAction } from '../../controllers/action.controller'
import { validateAction } from '../../middlewares/validator';

const router = Router();

/** 
 * @openapi
 * /action:
 *   post:
 *    tags: [Action]
 *    description: Add new action
 *    parameters:
 *    - in: body
 *      name: action
 *      required: true
 *      description: Action object
 *      schema:
 *        type: object
 *        properties:
 *          chatId:
 *            type: number
 *            description: User chat id
 *            required: true
 *            example: 1444332
 *          actionName:
 *            type: string
 *            description: Action name [like, love, applause, cloudtag, poll, final]
 *            required: true
 *            example: like
 *          actionValue:
 *            type: string
 *            description: Action value
 *            example: 1
 *          lobbyId:
 *            type: number
 *            description: Lobby id
 *            required: true
 *            example: 1
 *    responses:
 *      200:
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Success message
 *      400:
 *        description: Bad request
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
 */
router.post('/', validateAction, addNewAction);

export default router;