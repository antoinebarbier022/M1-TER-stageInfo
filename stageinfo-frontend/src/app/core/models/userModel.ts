export class userModel{
    nom: String | undefined;
  email: String | undefined;
  fax: Number | undefined;
    hash: String | undefined;
    role: String | undefined;

    //etudiant
    numeroEtudiant: String | undefined;
    promotion: String | undefined;
    idParcours: String | undefined;

    //représentant entreprise
    fonctionOccupee : String | undefined;
    idEntreprise: String | undefined;
}
