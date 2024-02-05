import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import colors from 'colors'
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';


const app = express();
const port = process.env.PORT || 5000;

// If using traditional long-running server:
// connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(cors())

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/aws-s3', uploadRoutes);

app.use(notFound);
app.use(errorHandler);

//Connect to the database before listening
connectDB().then(() => {
  app.listen(port, () => console.log(colors.yellow(`Server running in ${process.env.NODE_ENV} mode on port ${port}`))
  );
})
