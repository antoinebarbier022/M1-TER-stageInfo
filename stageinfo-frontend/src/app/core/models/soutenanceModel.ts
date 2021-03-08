export class soutenanceModel = {
    titre: string;
    etudiant: string;
    tuteurUniv: string;
    tuteurEntreprise: string;
    rapporteur: string;
    entreprise: string;
    commentaire: string;
    session: number;

    modifications:{
        date: Date;
        idUser: string;
        motif: string;
    };

    idStage: string;
    idCreneau: string;
}