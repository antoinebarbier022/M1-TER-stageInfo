export enum EtatStage {
    propose = "Proposé",    // Le stage n'apparait pas dans le listing
    valide = "Validé",      // Le stage est valide , donc il est libre 
    refuse = "Refusé",       // Le stage est refusé
    reserve = "Reservé",    // Le stage est reservé à un étudiant, il est maintenant en attente de l'affectation
    //demande = "Demandé",    // une demande d'affectation d'un étudiant à un stage
    affectEtudiant = "Étudiant affecté",     // Le stage est affecté à un étudiant
    affectTuteur = "Tuteur affecté", // Les tuteurs peuvent choisir de tutoré le stage
    affectRapporteur= "Rapporteur affecté", // le rapporteur est choisie par le tuteur du stage (le rapporteur est un prof qui n'est pas le tuteur lui même)

    termine = "Terminé" // Le stage à terminé une fois la soutenance passé (changement d'état en fonction de la date soutenance)
  }