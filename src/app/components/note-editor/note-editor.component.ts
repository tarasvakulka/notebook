import { Component, OnInit } from '@angular/core';

import { NoteInterface } from '../../interfaces';
import { NotesService } from '../../services';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.scss']
})
export class NoteEditorComponent implements OnInit {

  notes: NoteInterface[] = [];

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
      this.notesService.notesDataObservable$
          .subscribe((notes: NoteInterface[]) => {
            debugger;
            this.notes = notes;
          });
  }

}
