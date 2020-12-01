import { Router, Request, Response } from "express"
import AuthController from "../Controllers/AuthController"
const router = Router();
const authController = new AuthController()

router.post("/", async (req: Request, res: Response, next): Promise<void> => {
    console.log(req.body)
    authController.login(req.body).then((data) => {
        res.send(data)
    }).catch((ex) => {
        console.log("Error happened", ex);
    })
})
export default router
