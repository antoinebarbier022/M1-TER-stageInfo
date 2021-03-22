export class EntrepriseModel{
    adresse= {
        voie:"",
        ville:"",
        codePostal: "",
        complement: "",
    };

    constructor(
        public _id: string ="",
        public idRespAdm: string = "",
        public nom: string  = "",
        public website: string  = "",
        public description: string  = "",
        public siret: string  = "",
        public telephone: string  = "",
        public fax: string  = "",
        public secteurActivite: string = "",
        public nbSalaries: string = "",
        public local: boolean = false,
        public chiffreAffaire: string = ""){}
}