/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('PaymentOrders', {
    institution_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    money: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: false,
      get: function () {
        return this.getDataValue('order_date').toLocaleDateString()
      }
    },
    kekv_code: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    bank_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'payment_orders'
  })
}
