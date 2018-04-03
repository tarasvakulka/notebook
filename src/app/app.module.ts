import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { RootComponent, SidebarComponent, NoteEditorComponent } from './components';
import { NotesService } from './services';

const routes = [
    {path: ':uuid', component: NoteEditorComponent}
];

@NgModule({
    declarations: [
        RootComponent,
        SidebarComponent,
        NoteEditorComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [NotesService],
    bootstrap: [RootComponent]
})
export class AppModule { }
