import {Component, OnInit} from '@angular/core';
import {NotesService} from '../../services';
import {NoteInterface} from '../../interfaces';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {
  title = 'app';

  constructor(private notesService: NotesService, private router: Router) { }

  ngOnInit(): void {
    this.notesService.loadNotes();
    this.router.navigate(["/new"]);
  }


}
