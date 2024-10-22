import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Tutorial } from '../models/tutorial.model';

@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  private tutorials: Tutorial[] = [
    { id: 1, title: 'Tutorial 1', description: 'Description 1', published: false },
    { id: 2, title: 'Tutorial 2', description: 'Description 2', published: true },
    // Add more tutorials as needed
  ];

  getAll(): Observable<Tutorial[]> {
    return of(this.tutorials);
  }

  get(id: number): Observable<Tutorial | undefined> {
    const tutorial = this.tutorials.find(t => t.id === id);
    return of(tutorial);
  }

  create(data: Tutorial): Observable<Tutorial> {
    const newTutorial = { id: this.tutorials.length + 1, ...data };
    this.tutorials.push(newTutorial);
    return of(newTutorial);
  }

  update(id: number, data: Tutorial): Observable<Tutorial | undefined> {
    const index = this.tutorials.findIndex(t => t.id === id);
    if (index !== -1) {
      this.tutorials[index] = { ...this.tutorials[index], ...data };
      return of(this.tutorials[index]);
    }
    return of(undefined);
  }

  delete(id: number): Observable<boolean> {
    const index = this.tutorials.findIndex(t => t.id === id);
    if (index !== -1) {
      this.tutorials.splice(index, 1);
      return of(true);
    }
    return of(false);
  }

  deleteAll(): Observable<boolean> {
    this.tutorials = [];
    return of(true);
  }

  findByTitle(title: string): Observable<Tutorial[]> {
    const results = this.tutorials.filter(t => t.title && t.title.includes(title));
    return of(results);
  }  
}