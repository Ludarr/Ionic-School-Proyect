import { Router } from "express";

import { createCustomer, deleteCustomer, getCustomer, getCustomers, updateCustomer } from '../controllers/customer.cotrollers.js'

const router = Router();

router.get("/clientes", getCustomers);
router.get("/clientes/:id", getCustomer);
router.post("/clientes", createCustomer);
router.put("/clientes/:id", updateCustomer);
router.delete("/clientes/:id", deleteCustomer);

export default router;