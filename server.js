import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import colors from 'colors'
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import emailRoutes from './routes/emailRoutes.js';
import googleRoutes from './routes/googleRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();
const port = process.env.PORT || 5000;

// If using traditional long-running server:
// connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS",
  allowedHeaders: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
	optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15mins
  max: 50 // number of requests can be made within 15mins
})
if (process.env.NODE_ENV !== 'development') { 
  app.use(limiter)
  app.set('trust proxy', 1)
}

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/images', uploadRoutes);
app.use('/api/emails', emailRoutes);
app.use('/api/google', googleRoutes)

app.use(notFound);
app.use(errorHandler);

//Connect to the database before listening
connectDB().then(() => {
  app.listen(port, () => console.log(colors.yellow(`Server running in ${process.env.NODE_ENV} mode on port ${port}`))
  );
})
