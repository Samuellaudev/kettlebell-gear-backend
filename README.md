# MERN Stack & Redux - eCommerce Platform

A dynamic eCommerce platform leveraging the MERN Stack & Redux for seamless online retail operations. Built with MongoDB, Express, React, Node.js, and Redux, it offers a scalable solution for managing inventory, processing transactions, and enhancing the shopping experience.

## 🔗 URL

[MERN Stack & Redux - eCommerce Platform](https://www.kettlebell-gear.com/)

## 🚀 Features

- Comprehensive shopping cart features
- Product reviews, ratings and pagination
- Products, users and orders management system using JWT authorization with HttpOnly Cookie
- Upload image using AWS S3 and retrieve it through presigned URLs
- Implementing PayPal / credit card (Test Mode) for checkout process

More project details [here](https://www.samuellau.dev/projects/mern-stack-kettlebell-gear)

## Usage
- Create a MongoDB database and obtain your ```MONGO_URI``` - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
- Create a PayPal account and obtain your ```PAYPAL_CLIENT_ID``` - [PayPal Developer](https://developer.paypal.com/)
- Create a AWS account, open a S3 bucket and obtain your ```ACCESS_KEY_ID``` and ```SECRET_ACCESS_KEY``` - [(Vercel) AWS S3 Image Upload](https://vercel.com/templates/next.js/aws-s3-image-upload-nextjs)

## Environment Variables
Rename the ```.env.example``` to ```.env.```:

```bash
PORT=5000
NODE_ENV=development
MONGO_URI=YOUR_MONGO_URI
JWT_SECRET=YOUR_JWT_SECRET
FRONTEND_URL=YOUR_FRONTEND_URL
PAYPAL_CLIENT_ID=YOUR_PAYPAL_CLIENT_ID

# AWS
AWS_HOST_NAME=YOUR_AWS_HOST_NAME
AWS_S3_BUCKET_NAME=YOUR_AWS_S3_BUCKET_NAME
AWS_REGION=YOUR_AWS_REGION
AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_ACCESS_KEY
```

## 🛠 Build Setup

This repository contains the backend components, while the frontend can be found in a separate [repository](https://github.com/Samuellaudev/kettlebell-gear).

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start
```