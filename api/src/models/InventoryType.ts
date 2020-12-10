import {
    Column,
    CreatedAt,
    DeletedAt,
    Model,
    PrimaryKey, 
    Table,
    UpdatedAt
} from 'sequelize-typescript'
  
@Table({ tableName: 'inventory_type' })
export class InventoryType extends Model<InventoryType> {
    @PrimaryKey
    @Column({ autoIncrement: true })
    id: number

    @Column
    start_time: string

    @Column
    end_time: string
    
    @Column
    max_per_interval: number
    
    @Column
    M: string
    
    @Column
    Tu: string
    
    @Column
    W: string
    
    @Column
    Th: string
    
    @Column
    F: string
    
    @Column
    Sa: string
    
    @Column
    Su: string

    @DeletedAt
    deleted_at: string

    @CreatedAt
    created_at: string

    @UpdatedAt
    updated_at: string
}