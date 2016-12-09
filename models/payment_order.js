/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('PaymentOrder', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    institutionId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'institution',
        key: 'id'
      },
      field: 'institution_id'
    },
    kekvId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'kekv',
        key: 'id'
      },
      field: 'kekv_id'
    },
    bankId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'bank',
        key: 'id'
      },
      field: 'bank_id'
    },
    money: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      field: 'money'
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'order_date'
    }
  }, {
    tableName: 'payment_order'
  })
}
