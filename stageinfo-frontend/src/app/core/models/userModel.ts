export class userModel{
    /*
    _id: string = "";
    nom: string  = "";
    prenom: string  = "";
    email: string  = "";
    telephone: string  = "";
    fax: string  = "";
    hash: string  = "";
    role: string  = "";

    //etudiant
    numeroEtudiant: string  = "";
    promotion: string  = "";
    parcours: string  = "";

    //représentant entreprise
    fonction : string  = "";
    entreprise: string  = "";
    */

    constructor(
        public nom: string,
        public prenom: string,
        public email: string,
        public telephone: string,
        public fax: string,
        public hash: string,
        public role: string,

        // Si étudiant
        public numeroEtudiant: string,
        public promotion: string,
        public parcours: string,

        // Si représentant entreprise
        public fonction: string,
        public entreprise: string
    ){}
}
