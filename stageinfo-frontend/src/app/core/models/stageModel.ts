export class StageModel {
    constructor(
        public id: string ="",
        public titre: string ="",
        public description: string ="",
        public duree: string ="",
        public dateDebut: string = "",
        public niveauRequis: string ="",
        public parcours : string ="",
        public entreprise: string ="",
        public competences: string ="",
        public conditions: string ="",
        public avantages: string = "",
        ){}
    
/*
 et plein d'autre
        public rapport: string ="",
        public fichier: string ="",
        public etat: string = "",
    commentaires : any[];

    ficheSuivi: {
        dateDebut: Date;
        dateFin: Date;
        commentaireBilan: string;
        embauche: string;
        commentaireEmbauche: string;
        dateFiche: Date;
    };

    noteStage: {
        date: Date;
        valeur: string;
        commentaire: string;
    };

    parcours: {
        idParcours: string;
        nomComplet: string;
    };

    ajouteur: {
        idAjouteur: string;
        nomComplet: string;
    };

    entreprise: {
        idEntreprise: string;
        nomComplet: string;
    };

    tuteurUniv: {
        idTuteurUniv: string;
        nomComplet: string;
    };

    tuteurEntreprise: {
        idTuteurEntreprise: string;
        nomComplet: string;
    }

    rapporteur: { 
        idRapporteur: string;
        nomComplet: string;
    }

    etudiant: {
        idEtudiant: string;
        nomComplet: string;
    }

    idVisite: {
        typeContact: string;
        dateVisite: Date;
        commentaire: string;
    }
*/
}