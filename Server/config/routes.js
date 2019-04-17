const authRoutes = require('../routes/auth')
const productRoutes = require('../routes/product')
//const statsRoutes = require('../routes/stats')
const ordersRoutes = require('../routes/order')

module.exports = (app) => {
  app.use('/auth', authRoutes)
  app.use('/product', productRoutes)
  //app.use('/stats', statsRoutes)
  app.use('/orders', ordersRoutes)
}