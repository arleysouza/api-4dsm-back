import { AppDataSource } from "../app-data-source"
import { Request, Response } from 'express'
import { Station } from '../entity/Station'
import { Sensor } from "../entity/Sensor"

class SensorController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { idstation, description, model, minrange, maxrange, accurace, startdate, enddate, unit, access } = req.body
    const station: any = await AppDataSource.manager.findOneBy(Station, { id: idstation }).catch((e) => {
      return { error: "Identificador inválido da estação" }
    })
    
    if (station && station.id) {
      const sensor = new Sensor()
      sensor.station = station
      sensor.description = description === ""? null : description
      sensor.model = model === ""? null : model
      sensor.minrange = minrange === ""? null : minrange
      sensor.maxrange = maxrange === ""? null : maxrange
      sensor.accurace = accurace === ""? null : accurace
      sensor.startdate = startdate === ""? null : startdate
      sensor.enddate = enddate === ""? null : enddate
      sensor.unit = unit === ""? null : unit
      sensor.access = access === ""? null : access
      const r = await AppDataSource.manager.save(Sensor, sensor).catch((e) => {
        return { error: e.message }
      })
      return res.json(r)
    }
    else if (!station) {
      return res.json({ error: "Estação não identificada" })
    }
    else {
      return res.json(station)
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
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
  }

  public async listByStation(req: Request, res: Response): Promise<Response> {
    const { idstation } = req.body
    const sensors = await AppDataSource
      .getRepository(Sensor)
      .createQueryBuilder('sensors')
      .innerJoin(Station, "stations", "stations.id=sensors.idstation")
      .select()
      .where("stations.id=:idstation", { idstation })
      .orderBy({ description: "ASC" })
      .getMany()
    return res.json(sensors)
  }
}

export default new SensorController()