export class StageModel {
    constructor(
        public _id: string ="",
        public etat : string ="",
        public titre: string ="",
        public description: string ="",
        public duree: string ="",
        public dateDebut: string = "",
        public niveauRequis: string ="",
        public parcours : string ="",
        public entreprise: string ="",
        public competences: string ="",
        public conditions: string ="",
        public avantages: string = ""
        ){}
}