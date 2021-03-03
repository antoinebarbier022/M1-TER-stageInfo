export class userModel = {
    nom: string;
    prenom: string;
    email: string;
    telephone: number;
    fax: number;
    hash: string;
    role: string;

    //etudiant
    numeroEtudiant: string;
    promotion: string;
    idParcours: string;

    //représentant entreprise
    fonctionOccupee : string;
    idEntreprise: string;
}