import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm"
import { Station } from "./Station"

export type Access = "public" | "privete"

@Entity({name:"sensors"})
export class Sensor {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne((type) => Station, { onDelete: 'CASCADE' })
    @JoinColumn({
        name: "idstation",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_station_id"
    })
    station: Station

    @Column({length:50, nullable:false})
    description: string

    @Column({length:150, nullable:true})
    model: string

    @Column({type:'float', nullable:true})
    minrange: number

    @Column({type:'float', nullable:true})
    maxrange: number

    @Column({type:'float', nullable:true})
    accurace: number

    @Column({type:'timestamp', nullable:true})
    startdate: Date

    @Column({type:'timestamp', nullable:true})
    enddate: Date

    @Column({length:30, nullable:true})
    unit: string

    @Column({type:'enum', enum:['public','private'], default:'public', nullable:false})
    access: Access
}