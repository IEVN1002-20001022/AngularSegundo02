import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlumnosUtl } from '../alumnos';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProyectoapiService } from '../proyectoapi.service';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './editar.component.html',
})
export class EditarComponent implements OnInit {

  regAlumno: AlumnosUtl = {
    matricula: 0,
    nombre: '',
    apaterno: '',
    amaterno: '',
    correo: ''
  };

  formGroup!: FormGroup;
  matriculaParam!: number;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public alumnosUtl: ProyectoapiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.formGroup = this.initForm();

    // 🔥 Recuperar el parámetro de la URL
    this.matriculaParam = Number(this.activatedRoute.snapshot.paramMap.get('matricula'));

    console.log("Editando alumno: ", this.matriculaParam);

    // 🔥 Cargar alumno desde el backend
    this.alumnosUtl.getAlumno(this.matriculaParam).subscribe({
      next: (response) => {
        console.log("Alumno cargado: ", response);
        this.regAlumno = response; // 🔥 Aquí sí es directo
      },
      error: (e) => console.error(e)
    });
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

  modificar() {
    this.alumnosUtl.modificarAlumno(this.matriculaParam, this.regAlumno).subscribe({
      next: () => console.log("Alumno actualizado"),
      error: (e) => console.error(e),
      complete: () => console.info("Actualizado")
    });

    this.router.navigate(['/utl/listaalumnos']);
  }
}
