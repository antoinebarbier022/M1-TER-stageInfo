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

    }









    
}