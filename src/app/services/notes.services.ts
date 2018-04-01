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
    }

    editNote(noteData: NoteInterface, noteId: string) {
        let editedNotes: NoteInterface[] = this.notesData.map((note: NoteInterface) => {
            if(note.id === noteId) {
                Object.assign(note, noteData);
                return note;
            } else {
                return note;
            }
        });
        this.notesData$.next(editedNotes);
    }

    deleteNote(noteId: string) {
        let deleteIndex: number;
        for(let i: number = 0; i < this.notesData.length; i++) {
            if(this.notesData[i].id === noteId) {
                deleteIndex = i;
            }
        }
        this.notesData.splice(deleteIndex, 1);
        this.notesData$.next(this.notesData);

    }

    searchNote(searchData) {
        let keyWords: string = searchData.split(', ');
        let searchNotes: NoteInterface[] = this.notesData.filter((note: NoteInterface) => {
            let isNoteKeyWord: boolean = false;
            for (let i: number = 0; i< keyWords.length; i++) {
                if(note.keywords.indexOf(keyWords[i]) !== -1) {
                    isNoteKeyWord = true;
                } else {
                    isNoteKeyWord = false;
                }
            }
            if(isNoteKeyWord) return true;
        });
        if (searchNotes.length) {
            this.notesData$.next(searchNotes);
        }
        else {
            this.notesData$.next(this.notesData);
        }
    }

}
