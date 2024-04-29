const bookModel = (sequelize, DataTypes) => {
    return sequelize.define(
      "t_books",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        epub: {
          type: DataTypes.BLOB('long'),
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Le nom ne peut pas être vide.",
            },
            notNull: {
              msg: "Le nom est une propriété obligatoire.",
            },
          },
        }
      },
      {
        timestamps: true,
        createdAt: "created",
        updateAt: false,
      }
    );
  };
  
  export { bookModel };
  