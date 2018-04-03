import { Component, OnInit } from '@angular/core';
import { NotesService} from '../../services';
import { NoteInterface } from '../../interfaces';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    notes: NoteInterface[] = [];

    constructor(private notesService: NotesService) {
    }

    ngOnInit(): void {
        this.notesService.notesDataObservable$
            .subscribe((notes: NoteInterface[]) => {
                this.notes = notes;
            });
    }

}
