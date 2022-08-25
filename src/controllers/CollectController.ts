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
      collect.value = value === ""? null : value
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

  public async update(req: Request, res: Response): Promise<Response> {
    let { id, moment, value } = req.body
    moment = moment === ""? null : moment
    value = value === ""? null : value
    console.log({ id, moment, value })
    const collect: any = await AppDataSource.manager.save(Collect, { id, moment, value }).catch((e) => {
      return { error: e.message }
    })
    return res.json(collect)
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body
    const r = await AppDataSource
      .createQueryBuilder()
      .delete()
      .from(Collect)
      .where("id=:id", { id })
      .execute()

    return res.json(r)
  }

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