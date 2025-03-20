import express from 'express'
import { addDoctor } from '../controllers/adminController.js'

const adminRouter=express.Router()

adminRouter.post('/add-doctor',addDoctor)

export default adminRouter