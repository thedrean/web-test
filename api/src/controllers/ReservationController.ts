import { Controller, Get , Post } from '@overnightjs/core'
import { Request, Response } from 'express'
import { Sequelize } from 'sequelize-typescript'
import { Op } from 'sequelize'
import { Reservation } from '../models/Reservation'
import { Inventory } from '../models/Inventory'
import { InventoryType } from '../models/InventoryType'

@Controller('reservation')
export class ReservationController {
  @Get('')
  private async get(req: Request, res: Response) {
    console.log('GET reservations req.body', req.body)
    Reservation.findAll()
      .then(mdls => res.json(mdls))
    
  }
  
  @Post('')
  private async add(req: Request, res: Response) {
    var body = req.body;
    Inventory.findAll({
      where: Sequelize.where(Sequelize.fn('date', Sequelize.col('date')), '=', body.date)
    }).then((inventory) => {
      // Reservation exists in this slot
      if(inventory.length && inventory[0].dataValues.slots_left){
        var values = {
          name: body.name,
          email: body.email,
          party_size: body.partySize,
          date: body.date,
          time: body.time,
        } 
        var reservation = new Reservation(values)
        reservation.save()
          .then(() => inventory[0].update({slots_left: inventory[0].dataValues.slots_left-1}))
          .then(() => {
            return res.sendStatus(200)
          })
      // Reservation exists in this slot
      } else if(inventory.length && inventory[0].dataValues.slots_left == 0) {
        return res.status(500).send('Time Slot Full. Please select another time')
      // first reservation in slot
      } else {
        InventoryType.findAll({
          where: {
            start_time: {
              [Op.lte]: body.time
            },
            end_time: {
              [Op.gt]: body.time
            }
          }
        })
        .then((inventoryType) => {
          var newInventoryValues = {
            inventory_type_id: inventoryType[0].dataValues.id,
            time: body.time,
            date: body.date,
            slots_left: inventoryType[0].dataValues.max_per_interval-1,
          }
          var values = {
            name: body.name,
            email: body.email,
            party_size: body.partySize,
            date: body.date,
            time: body.time,
          } 
          var reservation = new Reservation(values)
          var newInventory = new Inventory(newInventoryValues)
  
          newInventory.save()
            .then(() => reservation.save())
            .then(() => {
              return res.sendStatus(200)
            })
        })
      }
    })
  }
}