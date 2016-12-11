/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Kekv', {
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'description'
    }
  }, {
    tableName: 'kekv'
  })
}
