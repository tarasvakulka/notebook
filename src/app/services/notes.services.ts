import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { v4 as uuid } from 'uuid';

import { NoteInterface } from '../interfaces';

@Injectable()
export class NotesService {

    notesUrl: string = 'https://demo0707651.mockable.io/fake_json';

    notesData$: Subject<NoteInterface[]> = new Subject<NoteInterface[]>();

    notesData: NoteInterface[] = [];

    constructor(private http: HttpClient) { }

    loadNotes(): any {
        return this.http.get<NoteInterface[]>(this.notesUrl)
            .subscribe((notes: NoteInterface[]) => {
                const newNotes = notes.map(note => {
                  note.id = uuid();
                  return note;
                });
                this.notesData$.next(newNotes);
            });
    }

    get notesDataObservable$(): Observable<any> {
        return this.notesData$.asObservable();
    }

}
