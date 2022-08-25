import { Router, Request, Response } from "express"
import station from './station'
import sensor from './sensor'
import collect from './collect'

const routes = Router()

routes.use("/stations", station)
routes.use("/sensors", sensor)
routes.use("/collects", collect)

//aceita qualquer método HTTP ou URL
routes.use( (req:Request,res:Response) => res.json({error:"Requisição desconhecida"}) )

export default routes