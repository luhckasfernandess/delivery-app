const { Sale, SaleProduct, User } = require('../database/models')

const insertSaleService = async (body) => {
  const userId = await User.findOne({ where: { email: body.User.email } })
  if (userId.id) {
    const newSale = await Sale.create({
      userId: userId.id,
      sellerId: body.Vendedor,
      totalPrice: body.totalPrice,
      deliveryAddress: body.Endereco,
      deliveryNumber: body.Numero,
      saleDate: new Date(),
      status: 'Pendente',
    });
    const newSaleProduct = body.Produtos.map(async (item) => {
      return await SaleProduct.create({
        saleId: newSale.id,
        productId: item.id,
        quantity: item.quantity,
      })
    })
    return newSale.id;
  }

}

module.exports = {
  insertSaleService,
}