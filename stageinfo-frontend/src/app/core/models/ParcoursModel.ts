export class ParcoursModel{
  constructor(
    public _id: string="",
    public acronyme: string ="",
    public niveau: string ="",
    public intitule: string ="",
    public description: string ="",
    public responsable: { _id :string, nom:string, prenom: string} = {_id: "", nom:"", prenom:""}){}
}
