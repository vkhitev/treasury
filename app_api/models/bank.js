/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Bank', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'name'
    }
  }, {
    tableName: 'bank'
  })
}
