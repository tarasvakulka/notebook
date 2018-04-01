import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { NoteInterface } from '../../interfaces';
import { NotesService } from '../../services';
import {ActivatedRoute, Router} from '@angular/router';
import { v4 as uuid } from 'uuid';

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

    handlerSaveNote(): void {
        if (this.id === 'new') {
            this.notesService.addNote(this.getFormData());
            this.notesForm.setValue({
                noteName: '',
                noteDescription: '',
                noteKeywords: '',
                noteDate: ''
            });
        } else {
            this.notesService.editNote(this.getFormData(), this.id);
        }
    }

    handlerDeleteNote(): void {
        if(this.id !== 'new') {
            this.notesService.deleteNote(this.id);
            this.router.navigate(["/new"]);
        }
    }

    handlerSearch(): void {
        this.notesService.searchNote(this.notesForm.get('searchField').value);
    }

    private initForm(): void {
        this.notesForm = this.fb.group({
            searchField: '',
            noteName: '' ,
            noteDescription: '',
            noteKeywords: '',
            noteDate: ''
        });
    }

    private setFormData(): void {
        if (this.id === 'new') {
            this.notesForm.setValue({
                searchField: '',
                noteName: '',
                noteDescription: '',
                noteKeywords: '',
                noteDate: ''
            });
        } else {
            this.currentNote = this.notes.find((note: NoteInterface) => note.id === this.id);
            this.notesForm.patchValue({
                noteName: this.currentNote.name,
                noteDescription: this.currentNote.description,
                noteKeywords: this.mapKeyWords(this.currentNote.keywords),
                noteDate: this.currentNote.date
            });
        }
    }

    private mapKeyWords(keyWords) {
        return keyWords.join(', ');
    }

    private getFormData() {
        let noteKeyWords = this.notesForm.get('noteKeywords').value.split(', ');
        return {
            id : uuid(),
            name: this.notesForm.get('noteName').value,
            description: this.notesForm.get('noteDescription').value,
            keywords: noteKeyWords,
            date: this.notesForm.get('noteDate').value
        }
    }

}
