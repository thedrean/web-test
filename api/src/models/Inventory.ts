import {
    Column,
    CreatedAt,
    DeletedAt,
    Model,
    PrimaryKey, 
    Table,
    UpdatedAt
} from 'sequelize-typescript'
  
@Table({ tableName: 'inventory' })
export class Inventory extends Model<Inventory> {
    @PrimaryKey
    @Column({ autoIncrement: true })
    id: number

    @Column
    inventory_type_id: number

    @Column
    time: string
    
    @Column
    date: string
    
    @Column
    slots_left: number
    
    @DeletedAt
    deleted_at: string

    @CreatedAt
    created_at: string

    @UpdatedAt
    updated_at: string
}
