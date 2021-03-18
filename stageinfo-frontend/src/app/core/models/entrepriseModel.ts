export class entrepriseModel{
    idRespAdm: string = "";
    _id: string ="";
    nom: string  = "";
    website: string  = "";
    description: string  = "";
    siret: string  = "";
    telephone: string  = "";
    fax: string  = "";

    adresse= {
        voie:"",
        ville:"",
        codePostal: "",
        complement: "",
    };

    secteurActivite: string = "";
    nbSalaries: string = "";
    local: boolean = false;
    chiffreAffaire: string = "";
}