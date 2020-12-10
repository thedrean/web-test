import {
    Column,
    CreatedAt,
    DeletedAt,
    Model,
    PrimaryKey, 
    Table,
    UpdatedAt
} from 'sequelize-typescript'
  
@Table({ tableName: 'reservation' })
export class Reservation extends Model<Reservation> {
    @PrimaryKey
    @Column({ autoIncrement: true })
    id: number

    @Column
    name: string

    @Column
    email: string
    
    @Column
    party_size: number
    
    @Column
    date: Date
    
    @Column
    time: string

    @DeletedAt
    deleted_at: string

    @CreatedAt
    created_at: string

    @UpdatedAt
    updated_at: string
}