import express from 'express';  
import cors from 'cors';
import productRoutes from "./routes/products.routes.js";
import cartegoryRoutes from "./routes/cartegory.routes.js";
import customerRoutes from "./routes/customer.routes.js";

const app = express();

app.use(cors());
app.use(express.json())
app.use(productRoutes);
app.use(cartegoryRoutes);
app.use(customerRoutes);

export default app;