import { Router, Request, Response } from "express"
import UserController from "../Controllers/UserController"
const router = Router();
const userController = new UserController()

router.post("/", async (req: Request, res: Response, next): Promise<void> => {
    userController.store(req.body).then((data) => {
        res.send(data)
    }).catch((ex) => {
        console.log("Error happened", ex);
    })
})
export default router
