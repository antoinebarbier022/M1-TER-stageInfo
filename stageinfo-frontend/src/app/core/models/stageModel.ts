export class stageSchema = {
    titre: string;
    description: string;
    duree: number;
    dateDebut: Date;
    etat: string;
    rapport: string;
    fichier: string;
    conditions: string;
    objectif: string;
    avantages: string;
    datePropose: Date;
    resume: string;
    niveauRequis: string;

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

}