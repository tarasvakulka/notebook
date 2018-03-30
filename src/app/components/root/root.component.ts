import {Component, OnInit} from '@angular/core';
import {NotesService} from '../../services';
import {NoteInterface} from '../../interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {
  title = 'app';

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    this.notesService.loadNotes();
  }


}
