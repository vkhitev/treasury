/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Kekv', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    code: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      validate: {
        len: 4
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'kekv'
  })
}
