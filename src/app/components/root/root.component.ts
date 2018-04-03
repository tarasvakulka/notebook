import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NotesService } from '../../services';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  constructor(private notesService: NotesService, private router: Router) { }

  ngOnInit(): void {
    this.notesService.loadNotes();
    this.router.navigate(['/new']);
  }

}
