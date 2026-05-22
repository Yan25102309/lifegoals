import { Component, OnInit } from '@angular/core';
import { MetaService } from '../services/meta-service.service';
import { Meta } from '../models/meta.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  listaMetas: Meta[] = [];
  nuevaMetaTexto: string = '';

  constructor(private metaService: MetaService) { }

  ngOnInit(): void {
    // Escucha en tiempo real los cambios en la colección de Firestore
    this.metaService.getMetas().subscribe({
      next: (data) => {
        this.listaMetas = data;
      },
      error: (err) => {
        console.error("Error al consultar Firestore: ", err);
      }
    });
  }

  guardarMeta(): void {
    // Validación para no guardar metas en blanco
    if (!this.nuevaMetaTexto || this.nuevaMetaTexto.trim() === '') {
      return;
    }

    const objetoMeta: Meta = {
      meta: this.nuevaMetaTexto.trim()
    };

    this.metaService.addMeta(objetoMeta)
      .then(() => {
        this.nuevaMetaTexto = ''; // Limpia el input tras un guardado exitoso
      })
      .catch((err) => {
        console.error("Error al insertar en Firestore: ", err);
      });
  }

  eliminarMeta(id: string | undefined): void {
    if (id) {
      this.metaService.deleteMeta(id)
        .catch((err) => {
          console.error("Error al borrar de Firestore: ", err);
        });
    } else {
      console.warn("No se puede eliminar: El documento no tiene un ID válido.");
    }
  }
}
