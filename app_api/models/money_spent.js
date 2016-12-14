/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('MoneySpent', {
    institution_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    money_spent: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    years_working: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: 'money_spent'
  })
}
