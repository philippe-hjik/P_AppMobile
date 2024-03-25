const categoryModel = (sequelize, DataTypes) => {
    return sequelize.define(
      "t_categories",
      {
        id_category: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name_category: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                  msg: "Le nom ne peut pas être vide.",
                }
                // notNull: {
                //   msg: "Le nom est une propriété obligatoire.",
                // },
            },
        },
      }
    );
  };
  
  export { categoryModel };
  