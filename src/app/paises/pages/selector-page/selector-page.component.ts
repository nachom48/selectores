import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';
import { Paises } from '../../interfaces/pais';
import { PaisesServiceService } from '../../services/paises-service.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',

})
export class SelectorPageComponent implements OnInit {


   miFormulario: FormGroup = this.fb.group({
      region    : ['',Validators.required ],
      pais      : ['',Validators.required ],
      fronteras  : ['',Validators.required ],
    })


  constructor(private fb : FormBuilder,
              private paisesService:PaisesServiceService) { }

    //llenar selectores


    regiones  : string [] = []
    paises    : Paises [] = []
    fronteras : Paises [] = []
    //UI

    cargando : boolean = false;
  ngOnInit(): void {
    //siempre que llamemos a una API mejor hacerlo desde el ngOnInit
    this.regiones=this.paisesService.regiones;
    // //cuando cambie la region
    // this.miFormulario.get('region')?.valueChanges
    //     .subscribe(region=>{
    //       console.log(region)
    //       this.paisesService.getPaisesPorRegion(region).subscribe(paises=>{
    //         this.paises=paises;
    //       })
    //     })
    this.miFormulario.get('region')?.valueChanges
    //el pipe me ayuda a transformar el valor y a disparar otros operadores
    .pipe(
      tap((_) =>{
        this.miFormulario.get('pais')?.reset('');
        this.cargando=true;
    }),
      switchMap(region => this.paisesService.getPaisesPorRegion(region)),

    )
      .subscribe(paises=>{
        this.paises=paises;
        this.cargando=false;
      })
      //Cuando cambia el pais
      this.miFormulario.get('pais')?.valueChanges
      .pipe(
        tap((_)=> this.miFormulario.get('frontera')?.reset('')),
        switchMap(codigo=> this.paisesService.getPaisPorCodigo(codigo))
      )
      .subscribe(paisResult=>{
        if(paisResult !== null ){
          if(paisResult.length > 0){
            this.fronteras = paisResult[0]?.borders;
            console.log(this.fronteras);
          }
        }
      })
    }





  guardar(){
    console.log(this.miFormulario.value);
  }
}
