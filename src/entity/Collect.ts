import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm"
import { Sensor } from "./Sensor"

@Entity({name:"collects"})
export class Collect {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne((type) => Sensor, { onDelete: 'CASCADE' })
    @JoinColumn({
        name: "idsensor",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_sensor_id"
    })
    sensor: Sensor

    @Column({type:'timestamp', nullable:false})
    moment: Date

    @Column({type: 'float', nullable:true})
    value: number
}