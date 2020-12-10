require('source-map-support/register')
import { Sequelize } from 'sequelize-typescript'
import { RouterServer } from './RouterServer'
import * as models from './models'
import { InventoryType } from './models/InventoryType'

;(async () => {
  new RouterServer().start(8080)

  const sequelize = new Sequelize(process.env.DATABASE_CONNECTION_STRING, {
    dialect: 'postgres',
    logging: process.env.LOG === 'debug' ? console.log : false,
    models: Object.keys(models).map(k => models[k]),
  })
  InventoryType.upsert(
    {
      "id": 3,
      "start_time": "11:00",
      "end_time": "15:00",
      "max_per_interval": 3,
      "M": "1",
      "Tu": "1",
      "W": "1",
      "Th": "1",
      "F": "1",
      "Sa": "1",
      "Su": "1",
      "created_at": "2020-12-08 20:37:01.414+00",
      "updated_at": "2020-12-08 20:37:01.414+00"
    }
  ).then(()=> {
    console.log("upsert successful")
  })
  InventoryType.upsert(
    {
      "id": 4,
      "start_time": "15:00",
      "end_time": "18:00",
      "max_per_interval": 0,
      "M": "1",
      "Tu": "1",
      "W": "1",
      "Th": "1",
      "F": "1",
      "Sa": "1",
      "Su": "1",
      "created_at": "2020-12-08 20:37:01.414+00",
      "updated_at": "2020-12-08 20:37:01.414+00"
    }
  ).then(()=> {
    console.log("upsert successful")
  })
  InventoryType.upsert(
    {
      "id": 5,
      "start_time": "18:00",
      "end_time": "23:00",
      "max_per_interval": 6,
      "M": "1",
      "Tu": "1",
      "W": "1",
      "Th": "1",
      "F": "1",
      "Sa": "1",
      "Su": "1",
      "created_at": "2020-12-08 20:37:01.414+00",
      "updated_at": "2020-12-08 20:37:01.414+00"
    }
  ).then(()=> {
    console.log("upsert successful")
  })
  InventoryType.upsert(
    {
      "id": 6,
      "start_time": "23:00",
      "end_time": "11:00",
      "max_per_interval": 0,
      "M": "1",
      "Tu": "1",
      "W": "1",
      "Th": "1",
      "F": "1",
      "Sa": "1",
      "Su": "1",
      "created_at": "2020-12-08 20:37:01.414+00",
      "updated_at": "2020-12-08 20:37:01.414+00"
    }
  ).then(()=> {
    console.log("upsert successful")
  })

  await sequelize.sync({
    alter: true
  })

})()
