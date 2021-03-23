export class StageModel {
    constructor(
        public titre: string ="",
        public description: string ="",
        public duree: string ="",
        public dateDebut: Date = new Date(),
        public etat: string = "",
        public rapport: string ="",
        public fichier: string ="",
        public conditions: string ="",
        public objectif: string ="",
        public avantages: string ="",
        public datePropose: Date = new Date(),
        public resume: string ="",
        public niveauRequis: string ="",){}
    
/*
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