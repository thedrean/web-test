import { Controller, Get , Post } from '@overnightjs/core'
import { Request, Response } from 'express'
import { Sequelize } from 'sequelize-typescript'
import { Op } from 'sequelize'
import { Reservation } from '../models/Reservation'
import { Inventory } from '../models/Inventory'
import { InventoryType } from '../models/InventoryType'

@Controller('inventory')
export class InventoryController {
  @Get(':date')
  private async get(req: Request, res: Response) {
    console.log('GET inventory req.body', req.body, req.params.date)
    // initialize new Date object
    var date_ob = new Date(Number(req.params.date) * 1000);

    // year as 4 digits (YYYY)
    var year = date_ob.getFullYear();

    // month as 2 digits (MM)
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // date as 2 digits (DD)
    var date = ("0" + date_ob.getDate()).slice(-2);
    var day = Number(date) - 2;
    var start = day + "-" + month + "-"  + year
    Inventory.findAll({
      where: {
        date: {
          [Op.gte]: start
        }
      }
    })
      .then(mdls => res.json(mdls))
    
  }
  
}