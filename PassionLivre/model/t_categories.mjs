const categoryModel = (sequelize, DataTypes) => {
    return sequelize.define(
      "t_tags",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        tag: {
            type: DataTypes.STRING,
            allowNull: false,
        },
      }
    );
  };
  
  export { categoryModel };
  