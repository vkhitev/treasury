/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('PaymentOrder', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    institution_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'institution',
        key: 'id'
      }
    },
    kekv_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'kekv',
        key: 'id'
      }
    },
    bank_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'bank',
        key: 'id'
      }
    },
    money: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: false,
      get: function () {
        return this.getDataValue('order_date').toLocaleDateString()
      }
    }
  }, {
    tableName: 'payment_order'
  })
}
