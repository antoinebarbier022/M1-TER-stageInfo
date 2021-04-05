/*************************************/
/** Own validators are created here **/
/*************************************/

import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";

/*
* Lorsqu'on créer un utilisateur, si le rôle défini est étudiant
* alors le champs Numéro étudiant devient requis.
*/
export let studentNumberRequiredValidator = (form: FormGroup) => {
    /*
    if(formGroup.value.role === 'etudiant'){
        return Validators.required(formGroup.get('role')) ? { 'studentNumberRequired': true } : null;
    }
    */
   console.log('here : ');
   console.log(form);
}

/*
* Vérifie que le nom saisi est bien celui d'un étudiant
*/
export let isStudentValidator = (userArray: Array<any>) : ValidatorFn => { 
    return (control: AbstractControl) : {[key: string]: boolean} | null => {
        let array = userArray.filter(x => x.role === 'etudiant')
                            .map(x => x.prenom + ' ' + x.nom);
        return control.value !== undefined && array.includes(control.value)? null : {'isStudent': false};
    }
}

/*
* Vérifie que le nom saisi est bien celui d'un représentant d'entreprise
*/
export let isRepresentantValidator = (userArray: Array<any>) : ValidatorFn => { 
    return (control: AbstractControl) : {[key: string]: boolean} | null => {
        let array = userArray.filter(x => x.role === 'representantEntreprise')
                            .map(x => x.prenom + ' ' + x.nom);
        
        return control.value !== undefined && array.includes(control.value)? null : {'isRepresentant': false};
    }
}

/*
* Vérifie que le nom saisi est bien celui d'un tuteur de l'université
*/
export let isTuteurUniversiteValidator = (userArray: Array<any>) : ValidatorFn => { 
    return (control: AbstractControl) : {[key: string]: boolean} | null => {
        let array = userArray.filter(x => x.role === 'tuteur')
                            .map(x => x.prenom + ' ' + x.nom);
        return control.value !== undefined && array.includes(control.value)? null : {'isTuteur': false};
    }
}