import { Router } from "express"
import controller from "../controllers/CollectController"

const routes = Router()

routes.get('/listbysensor', controller.listBySensor)
routes.post('/', controller.create)
routes.put('/', controller.update)
routes.delete('/', controller.delete)

export default routes