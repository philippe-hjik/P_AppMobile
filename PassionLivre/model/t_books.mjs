const bookModel = (sequelize, DataTypes) => {
    return sequelize.define(
      "t_books",
      {
        id_book: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        title_book: {
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
        pages_book: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                is: {
                    args: /^[0-9]\d+$/,
                    msg: "Seules les lettres et les espaces sont autorisées.",
                },
                notEmpty: {
                  msg: "Le nom ne peut pas être vide.",
                },
            },
        },
        extract_book: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: {
                  msg: "Le nom ne peut pas être vide.",
                },
            },
        },
        summary_book: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: {
                  msg: "Le nom ne peut pas être vide.",
                },
            },
        },
        cover_book: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: {
                    msg: "Le nom ne peut pas être vide.",
                },
            }
        },
        year_book: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                is: {
                    args: /^[0-9]\d+$/,
                    msg: "Seules les chiffre et les espaces sont autorisées.",
                },
                notEmpty: {
                  msg: "Le nom ne peut pas être vide.",
                },
            }
        },
        average_book: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        upload_book: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: {
                    msg: "Le nom ne peut pas être vide.",
                },
            }
        },
        fk_publisher: { // Champ pour la clé étrangère
            type: DataTypes.INTEGER, // Le type doit correspondre à celui de la clé primaire dans la table des auteurs
            allowNull: true,
            references: {
              model: 't_publishers', // Nom de la table que vous référencez
              key: 'id_publisher' // Nom de la colonne que vous référencez dans la table des auteurs
            },
            onUpdate: 'CASCADE', // Options pour le comportement de mise à jour et de suppression
            onDelete: 'RESTRICT'
        },
        fk_author: { // Champ pour la clé étrangère
            type: DataTypes.INTEGER, // Le type doit correspondre à celui de la clé primaire dans la table des auteurs
            allowNull: true,
            references: {
              model: 't_authors', // Nom de la table que vous référencez
              key: 'id_author' // Nom de la colonne que vous référencez dans la table des auteurs
            },
            onUpdate: 'CASCADE', // Options pour le comportement de mise à jour et de suppression
            onDelete: 'RESTRICT'
        },
        fk_category: { // Champ pour la clé étrangère
            type: DataTypes.INTEGER, // Le type doit correspondre à celui de la clé primaire dans la table des auteurs
            allowNull: true,
            references: {
              model: 't_categories', // Nom de la table que vous référencez
              key: 'id_category' // Nom de la colonne que vous référencez dans la table des auteurs
            },
            onUpdate: 'CASCADE', // Options pour le comportement de mise à jour et de suppression
            onDelete: 'RESTRICT'
        },
        fk_user: { // Champ pour la clé étrangère
            type: DataTypes.INTEGER, // Le type doit correspondre à celui de la clé primaire dans la table des auteurs
            allowNull: true,
            references: {
              model: 't_users', // Nom de la table que vous référencez
              key: 'id_user' // Nom de la colonne que vous référencez dans la table des auteurs
            },
            onUpdate: 'CASCADE', // Options pour le comportement de mise à jour et de suppression
            onDelete: 'RESTRICT'
        },
      },
      {
        timestamps: true,
        createdAt: "created",
        updateAt: false,
      }
    );
  };
  
  export { bookModel };
  