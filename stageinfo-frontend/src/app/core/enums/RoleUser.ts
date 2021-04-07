// Convention : les type en majuscule -> https://google.github.io/styleguide/jsguide.html#features-objects-enums

export enum RoleUser {
    INVITE = 'invite',
    ETUDIANT = 'etudiant',
    TUTEUR = 'tuteur',
    REPRESENTANT_ENTREPRISE ="repEntreprise",
    RESPONSABLE_PARCOURS = 'respParcours',
    RESPONSABLE_PEDAGOGIQUE = 'respPedagogique', // celui qui gère les stages
    SECRETAIRE = 'secretaire',
    ADMIN = 'admin'

  }