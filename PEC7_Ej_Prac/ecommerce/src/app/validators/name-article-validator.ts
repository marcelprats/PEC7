import { AbstractControl} from '@angular/forms'; 

export class NameArticleValidator {
   static nameArticleValidator(control: AbstractControl){
          const noValid: string[] = ['Prueba', 'Test', 'Mock', 'Fake'];
          const nom: string = control.get('name')?.value;
          if (noValid.includes(nom)) {
            control.get('name')?.setErrors({ nameArticleValidator: true });
          }
        
      }
}
