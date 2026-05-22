import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Meta } from '../models/meta.model';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  private collectionName = 'metas';

  constructor(private firestore: Firestore) { }

  // Obtener metas
  getMetas(): Observable<Meta[]> {
    const metasRef = collection(this.firestore, this.collectionName);
    return collectionData(metasRef, { idField: 'id' }) as Observable<Meta[]>;
  }

  // Agregar meta
  addMeta(nuevaMeta: Meta): Promise<any> {
    const metasRef = collection(this.firestore, this.collectionName);
    return addDoc(metasRef, nuevaMeta);
  }

  // Eliminar meta
  deleteMeta(id: string): Promise<any> {
    const docRef = doc(this.firestore, `${this.collectionName}/${id}`);
    return deleteDoc(docRef);
  }
}
