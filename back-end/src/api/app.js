const express = require('express');
const cors = require('cors');
const path = require('path');
const UsersRouter = require('../routes/user.router');
const ProductRouter = require('../routes/product.router');
const SaleRouter = require('../routes/sale.router');
const SaleProductRouter = require('../routes/sale-product.router');
const errorHandler = require('../middlewares/error-handler');
const AdminRouter = require('../routes/admin.router');

const app = express();
app.use(cors());
app.use('/images', express.static(path.join(__dirname, '..', '..', 'images')));
app.use(express.json());
app.use(UsersRouter);
app.use(AdminRouter);
app.use(ProductRouter);
app.use(SaleRouter);
app.use(SaleProductRouter);
app.use(errorHandler);

module.exports = app;
