import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './config/db.js';
import colors from 'colors'
import productRoutes from './routes/productRoutes.js';


connectDB();

const port = process.env.PORT || 5000;

const app = express();

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', productRoutes);


app.listen(port, () => console.log(colors.yellow(`Server running on port ${port}`)));
