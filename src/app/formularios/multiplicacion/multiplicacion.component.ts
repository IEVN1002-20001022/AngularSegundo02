import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-multiplicacion',
  standalone: true,
  imports: [
    CommonModule,          
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './multiplicacion.component.html',
  styleUrls: ['./multiplicacion.component.css']
})
export class MultiplicacionComponent {

  formulario!: FormGroup;
  resultado: number | null = null;  
  n1!: number;
  n2!: number;
  n3!: number;
  n4!: number;

  ngOnInit(): void {
    this.formulario = new FormGroup({
      numero1: new FormControl(''),
      numero2: new FormControl(''),
      numero3: new FormControl(''),
      numero4: new FormControl('')
    });
  }

  multiNumeros(): void {
    this.n1 = Number(this.formulario.value.numero1);
    this.n2 = Number(this.formulario.value.numero2);
    this.n3 = Number(this.formulario.value.numero3);
    this.n4 = Number(this.formulario.value.numero4);

    
    this.resultado = this.n1 * this.n2;
  }
}
