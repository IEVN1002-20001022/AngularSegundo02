import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProyectoapiService } from '../proyectoapi.service';
import { AlumnoFilterPipe } from '../alumnos-filter.pipe';
import { CommonModule } from '@angular/common';
import { AlumnosUtl } from '../alumnos';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [FormsModule, RouterLink, AlumnoFilterPipe, CommonModule],
  templateUrl: './alumnos.component.html',
})
export class AlumnosComponent implements OnInit {

  listFilter: string = '';
  dataSource: AlumnosUtl[] = [];   
  imageWidth: number = 50;
  imageMargin: number = 2;
  muestraImg: boolean = true;

  constructor(public alumnosUtl: ProyectoapiService) {}

  ngOnInit(): void {
    this.alumnosUtl.getAlumnos().subscribe({
      next: (response) => {
        console.log("Alumnos recibidos:", response);
        this.dataSource = response;  
      },
      error: (error) => console.log("Error al cargar alumnos:", error)
    });
  }
}
