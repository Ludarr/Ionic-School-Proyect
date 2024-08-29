import { Router } from "express";

import { createCartegory, deleteCartegory, getCartegory, getCartegories, updateCartegory } from '../controllers/cartegory.cotrollers.js'

const router = Router();

router.get("/categorias", getCartegories);
router.get("/categorias/:id", getCartegory);
router.post("/categorias", createCartegory);
router.put("/categorias/:id", updateCartegory);
router.delete("/categorias/:id", deleteCartegory);

export default router;