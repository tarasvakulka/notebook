import {Component, Input, OnInit} from '@angular/core';
import {NotesService} from '../../services';
import {NoteInterface} from '../../interfaces';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  notes: Observable<NoteInterface[]>;

  constructor(private notesService: NotesService) {
  }

}

