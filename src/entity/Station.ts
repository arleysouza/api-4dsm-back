import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({name:"stations"})
export class Station {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'float', nullable:false})
    lat: number

    @Column({type: 'float', nullable:false})
    lon: number

    @Column({length:150, nullable:false})
    reference: string
}