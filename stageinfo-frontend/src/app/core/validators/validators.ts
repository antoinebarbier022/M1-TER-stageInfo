/*************************************/
/** Own validators are created here **/
/*************************************/

import { AbstractControl, ValidatorFn } from "@angular/forms";


/*
* On vérifie que le numéro étudiant est syntaxiquement correct
*/
export let studentNumberIsCorrectValidator = (control: AbstractControl) : { [key: string]: boolean } | null  => {
    return control.value !== undefined && control.value !== null && control.value.match('^[0-9]{8}$')? null : {'studentNumberIsCorrect': false};
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