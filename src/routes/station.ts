import { Router } from "express"
import controller from "../controllers/StationController"

const routes = Router()

routes.get('/listall', controller.listAll)
routes.post('/', controller.create)
routes.put('/', controller.update)
routes.delete('/', controller.delete)

export default routes