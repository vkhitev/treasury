/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('InstitutionYearsWorking', {
    institution_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    years_working: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'institution_years_working'
  })
}
