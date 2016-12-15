/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Estimate', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    kekv_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'kekv',
        key: 'id'
      }
    },
    institution_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'institution',
        key: 'id'
      }
    },
    money_limit: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    year: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      validate: {
        min: 1991,
        max: 2100
      }
    }
  }, {
    tableName: 'estimate'
  })
}
