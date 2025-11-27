import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AlumnosUtl } from '../alumnos';
import { Router, RouterLink } from '@angular/router';
import { ProyectoapiService } from '../proyectoapi.service';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './agregar.component.html',
})
export class AgregarComponent implements OnInit {

  formGroup!: FormGroup;

  regAlumno: AlumnosUtl = {
    matricula: 0,
    nombre: '',
    apaterno: '',
    amaterno: '',
    correo: ''
  };

  constructor(
    private fb: FormBuilder,
    public alumnosutl: ProyectoapiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      matricula: [''],
      nombre: [''],
      apaterno: [''],
      amaterno: [''],
      correo: ['']
    });
  }

  agregar() {
    this.alumnosutl.agregarNuevoAlumno(this.regAlumno).subscribe({
      next: () => {
        console.log("Alumno agregado correctamente");

       
        this.regAlumno = {
          matricula: 0,
          nombre: '',
          apaterno: '',
          amaterno: '',
          correo: ''
        };

        
        this.router.navigate(['/utl/listaalumnos']);
      },
      error: (err) => {
        console.error("Error al agregar alumno:", err);
      }
    });
  }

  onSubmit(): void {
    const { matricula, nombre, apaterno, amaterno, correo } = this.formGroup.value;

    this.regAlumno = {
      matricula,
      nombre,
      apaterno,
      amaterno,
      correo
    };

    this.agregar();
  }

}
