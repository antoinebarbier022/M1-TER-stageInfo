import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { userModel } from 'src/app/core/models/userModel';
import { UserService } from 'src/app/core/services/user.service';
import { CommonListingTable } from 'src/app/shared/classes/common-listing-table';

@Component({
  selector: 'app-list-etudiants',
  templateUrl: './list-etudiants.component.html',
  styleUrls: ['./list-etudiants.component.scss']
})
export class ListEtudiantsComponent extends CommonListingTable implements OnInit, OnDestroy  {

  public readonly title: string = "Liste des étudiants";

  destroy$: Subject<boolean> = new Subject<boolean>();

  selectItem:any; // item qui est selectionné 

  constructor(private route:ActivatedRoute, private userService: UserService) { 
    super();
    this.visibleProperties = [
      { name: 'nom', sorted: false },
      { name: 'prenom', sorted: false },
      { name: 'email', sorted: false },
      { name: 'role', sorted: false }
    ];
    this.selectItem = new userModel();
  }

  ngOnInit(): void {
    this.allItems = this.route.snapshot.data.AllEtudiants; 
  }

  /**
   * @fonction selectedItem
   * @description Met à jour le parcours selectionné, permet au modal de savoir quelle contenu afficher
   * @params item : ParcoursModel -> contient les informations du parcours selectionné
   */
  selectedItem(item:any){
    this.selectItem = item;
  }

    /**
   * @fonction updateTable
   * @description Met à jour le tableau local des entreprises (afin d'eviter de recharger la page pour avoir la donnée modifier)
   * @params parcours : any -> contient toutes les données de l'entreprise qui a été modifié
   */
  updateTable(item:any){
    // on cherche l'index de l'entreprise modifié
    var index = this.allItems.findIndex(((obj: { _id: any; }) => obj._id == item._id));
    console.log("index update : "+ index);
    this.allItems[index] = item;  // On met a jour le tableau local avec les nouvelles datas
  }


  addUser(item:any){
    console.log(item);
  }

  /**
   * @fonction deleteParcours
   * @description Supprime le parcours selectionné sur la base de donnée et met à jour le tableau local
   * @params id : any -> identifiant du parcours à supprimer
   */
  deleteUser(id:any){
    console.log({message:"delete", id: id});
    /*this.userService.deleteUserById(id)
    .pipe(takeUntil(this.destroy$))
      .subscribe((_res: any[]) => {
        console.log(_res);
        // On supprime de l'affichage le parcours (on sait qu'il est supprimer de la base de donnée donc on peut le supprimer sans recharger les données distantes)
        this.allItems = this.allItems.filter((object: { _id: any; }) => { return object._id != id; });
      });*/
  }


  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


}
