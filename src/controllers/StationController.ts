import { AppDataSource } from "../app-data-source"
import { Request, Response } from 'express'
import { Station } from '../entity/Station'

class StationController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { lat, lon, reference } = req.body  
    const station = await AppDataSource.manager.save(Station, { lat, lon, reference }).catch((e) => {
      return { error: e.message }
    })

    return res.json(station)
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id, lat, lon, reference } = req.body
    const station = await AppDataSource.manager.save(Station, { id, lat, lon, reference }).catch((e) => {
      return { error: e.message }
    })

    return res.json(station)
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body
    const r = await AppDataSource
      .createQueryBuilder()
      .delete()
      .from(Station)
      .where("id=:id", { id })
      .execute()

    return res.json(r)
  }

  public async listAll(req: Request, res: Response): Promise<Response> {
    const stations = await AppDataSource.manager.find(Station, { order: { reference: "ASC" } })

    return res.json(stations)
  }
}

export default new StationController()