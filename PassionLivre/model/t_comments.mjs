const commentModel = (sequelize, DataTypes) => {
    return sequelize.define(
      "t_comments",
      {
        id_comment: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        note_comment: {
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
        text_comment: {
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
        fk_book: { // Champ pour la clé étrangère
            type: DataTypes.INTEGER, // Le type doit correspondre à celui de la clé primaire dans la table des auteurs
            allowNull: false,
            references: {
              model: 't_books', // Nom de la table que vous référencez
              key: 'id_book' // Nom de la colonne que vous référencez dans la table des auteurs
            },
            onUpdate: 'CASCADE', // Options pour le comportement de mise à jour et de suppression
            onDelete: 'CASCADE'
        },
        fk_user: { // Champ pour la clé étrangère
            type: DataTypes.INTEGER, // Le type doit correspondre à celui de la clé primaire dans la table des auteurs
            allowNull: false,
            references: {
              model: 't_users', // Nom de la table que vous référencez
              key: 'id_user' // Nom de la colonne que vous référencez dans la table des auteurs
            },
            onUpdate: 'CASCADE', // Options pour le comportement de mise à jour et de suppression
            onDelete: 'CASCADE'
        },
      }
    );
  };
  
  export { commentModel };
  