/*************************************/
/** Own validators are created here **/
/*************************************/

import { AbstractControl, ValidatorFn } from "@angular/forms";

/*
* Vérifie que le nom saisi est bien celui d'un étudiant
*/
let isStudentValidator = (userArray: Array<any>) : ValidatorFn { 
    return (control: AbstractControl) : {[key: string]: boolean} | null => {
        let array = userArray.filter(x => x.role === 'etudiant')
                            .map(x => x.prenom + ' ' + x.nom);
        console.log(array);
        return control.value !== undefined && array.includes(control.value)? {'isStudent': true} : null;
    }
}