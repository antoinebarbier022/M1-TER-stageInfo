export class UserModel{
    constructor(
        public _id: string = "",
        public nom: string  = "",
        public prenom: string  = "",
        public email: string  = "",
        public telephone: string  = "",
        public fax: string  = "",
        public password: string  = "",
        public role: string  = "",

        // Si étudiant
        public numeroEtudiant: string  = "",
        public promotion: string  = "",
        public parcours: string  = "",

        // Si représentant entreprise
        public fonction : string  = "",
        public entreprise: string  = ""
    ){}
}
