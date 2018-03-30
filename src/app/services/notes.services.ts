import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { NoteInterface } from '../interfaces';

@Injectable()
export class NotesService {

    notesUrl: string = 'https://demo0707651.mockable.io/fake_json';

    constructor(private http: HttpClient) { }

    getNotes(): Observable<NoteInterface[]> {
        return this.http.get<NoteInterface[]>(this.notesUrl);
    }

}