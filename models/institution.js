/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Institution', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    code: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'code'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'name'
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'address'
    }
  }, {
    tableName: 'institution'
  })
}
