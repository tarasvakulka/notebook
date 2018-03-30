import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { v4 as uuid } from 'uuid';

import { NoteInterface } from '../interfaces';

@Injectable()
export class NotesService {

    notesUrl: string = 'http://5abe4b7bd4c5900014949eaf.mockapi.io/note';

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
                this.notesData = newNotes;
                this.notesData$.next(newNotes);
            });
    }

    get notesDataObservable$(): Observable<any> {
        return this.notesData$.asObservable();
    }

    addNote(note: NoteInterface) {
        this.notesData.push(note);
        this.notesData$.next(this.notesData);
        this.http.post(this.notesUrl, this.notesData);
    }

}
