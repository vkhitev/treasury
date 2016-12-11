/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Estimate', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
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
    institutionId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'institution',
        key: 'id'
      },
      field: 'institution_id'
    },
    limit: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      field: 'limit'
    },
    year: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'year'
    }
  }, {
    tableName: 'estimate'
  })
}
