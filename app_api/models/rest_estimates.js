/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('RestEstimates', {
    institution_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    kekv_code: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    rest: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    tableName: 'rest_estimates'
  })
}
