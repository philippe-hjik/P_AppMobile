const authorModel = (sequelize, DataTypes) => {
    return sequelize.define(
      "t_authors",
      {
        id_author: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        firstName_author: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                  msg: "Le nom ne peut pas être vide.",
                },
                notNull: {
                  msg: "Le nom est une propriété obligatoire.",
                },
            },
        },
        lastName_author: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              notEmpty: {
                msg: "Le nom ne peut pas être vide.",
              },
              notNull: {
                msg: "Le nom est une propriété obligatoire.",
              },
          },
      },
      }
    );
  };
  
  export { authorModel };
  