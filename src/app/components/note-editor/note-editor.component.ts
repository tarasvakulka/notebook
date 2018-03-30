import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { NoteInterface } from '../../interfaces';
import { NotesService } from '../../services';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router, NavigationStart, Event, NavigationEnd} from '@angular/router';

@Component({
    selector: 'app-note-editor',
    templateUrl: './note-editor.component.html',
    styleUrls: ['./note-editor.component.scss']
})
export class NoteEditorComponent implements OnInit {

    public notesForm: FormGroup;

    public notes: NoteInterface[] = [];
    public currentNote: NoteInterface = null;

    private id: string;

    private routeSubscription: Subscription;

    constructor(
        private fb: FormBuilder,
        private notesService: NotesService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.notesService.notesDataObservable$
            .subscribe((notes: NoteInterface[]) => {
                this.notes = notes;
            });
        this.activatedRoute.params.subscribe(params => {
            this.id = params['uuid'];
            this.setFormData();
        });
    }

    private initForm(): void {
        this.notesForm = this.fb.group({
            noteName: '' ,
            noteDescription: '',
            noteKeywords: '',
            noteDate: ''
        });
    }

    private setFormData(): void {
        if (this.id === 'new') {
            this.notesForm.setValue({
                noteName: '',
                noteDescription: '',
                noteKeywords: '',
                noteDate: ''
            });
        } else {
           this.currentNote = this.notes.find((note: NoteInterface) => note.id === this.id);
           this.notesForm.setValue({
               noteName: this.currentNote.name,
               noteDescription: this.currentNote.description,
               noteKeywords: this.mapKeyWords(this.currentNote.keywords),
               noteDate: ''
           });
        }
    }

    private mapKeyWords(keyWords) {
        return keyWords.join(',');
    }

}
