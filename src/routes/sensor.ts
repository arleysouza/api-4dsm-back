import { Router } from "express"
import controller from "../controllers/SensorController"

const routes = Router()

routes.get('/listbystation', controller.listByStation)
routes.post('/', controller.create)
routes.put('/', controller.update)
routes.delete('/', controller.delete)

export default routes