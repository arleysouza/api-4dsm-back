import { AppDataSource } from "../app-data-source"
import { Request, Response } from 'express'
import { Collect } from '../entity/Collect'
import { Sensor } from "../entity/Sensor"

class CollectController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { idsensor, moment, value } = req.body
    const sensor: any = await AppDataSource.manager.findOneBy(Sensor, { id: idsensor }).catch((e) => {
      return { error: "Identificador inválido do sensor" }
    })
    
    if (sensor && sensor.id) {
      const collect = new Collect()
      collect.moment = moment === ""? null : moment
      collect.value = value
      collect.sensor = sensor
      const r = await AppDataSource.manager.save(Collect, collect).catch((e) => {
        return { error: e.message }
      })
      return res.json(r)
    }
    else if (!sensor) {
      return res.json({ error: "Sensor não identificado" })
    }
    else {
      return res.json(sensor)
    }
  }

  /*public async update(req: Request, res: Response): Promise<Response> {
    let { id, description, model, minrange, maxrange, accurace, startdate, enddate, unit, access } = req.body
    description = description === ""? null : description
    model = model === ""? null : model
    minrange = minrange === ""? null : minrange
    maxrange = maxrange === ""? null : maxrange
    accurace = accurace === ""? null : accurace
    startdate = startdate === ""? null : startdate
    enddate = enddate === ""? null : enddate
    unit = unit === ""? null : unit
    access = access === ""? null : access
    const sensor: any = await AppDataSource.manager.save(Sensor, { id, description, model, minrange, maxrange, accurace, startdate, enddate, unit, access }).catch((e) => {
      return { error: e.message }
    })
    return res.json(sensor)
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body
    const r = await AppDataSource
      .createQueryBuilder()
      .delete()
      .from(Sensor)
      .where("id=:id", { id })
      .execute()

    return res.json(r)
  }*/

  public async listBySensor(req: Request, res: Response): Promise<Response> {
    const { idsensor} = req.body
    const collects = await AppDataSource
      .getRepository(Collect)
      .createQueryBuilder('collects')
      .innerJoin(Sensor, "sensors", "sensors.id=collects.idsensor")
      .select()
      .where("sensors.id=:idsensor", { idsensor })
      .orderBy({ description: "ASC" })
      .getMany()
    return res.json(collects)
  }
}

export default new CollectController()