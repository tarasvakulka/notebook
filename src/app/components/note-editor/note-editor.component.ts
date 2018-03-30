import { Component, OnInit } from '@angular/core';

import { NoteInterface } from '../../interfaces';
import { NotesService } from '../../services';

@Component({
  selector: 'app-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.scss']
})
export class NoteEditorComponent implements OnInit {

  notes: NoteInterface[] = [];

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
      this.notesService.getNotes().subscribe((notes: NoteInterface[]) => {
          this.notes = notes;
          console.log(notes);
      });
  }

}
