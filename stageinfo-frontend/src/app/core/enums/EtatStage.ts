export enum EtatStage {
    propose = "Proposé",    // Le stage n'apparait pas dans le listing
    valide = "Validé",      // Le stage est valide , donc il est libre 
    refus = "Refusé",       // Le stage est refusé
    reserve = "Reservé",    // Le stage est reservé à un étudiant, il est maintenant en attente de l'affectation
    demande = "Demandé",    // une demande d'affectation d'un étudiant à un stage
    affect = "Affecté",     // Le stage est affecté à un étudiant
    choixTuteur = "Choix Tuteur", // Les tuteurs peuvent choisir de tutoré le stage
    valideTuteur = "Tuteur validé",  // validation du tuteur par la secretaire
    choixRapporteur= "Choix Rapporteur", // le rapporteur est choisie par le tuteur du stage (le rapporteur est un prof qui n'est pas le tuteur lui même)
    valideRapporteur = "Associé Tuteur", // le rapporteur est validé par la secrétaire

    termine = "Terminé" // Le stage à terminé une fois la soutenance passé (changement d'état en fonction de la date soutenance)
  }