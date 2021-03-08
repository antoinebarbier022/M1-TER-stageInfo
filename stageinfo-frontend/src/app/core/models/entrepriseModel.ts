export class entrepriseModel{
    idRespAdm: string;

    nom: string;
    website: string;
    description: string;
    siret: string;
    telephone: number;
    fax: number;

    adresse: {
        voie: string;
        ville: string;
        codePostal: string;
        complement: string;
    };

    secteurActivite: string;
    nbSalaries: number;
    local: boolean;
    chiffreAffaire: string;
}