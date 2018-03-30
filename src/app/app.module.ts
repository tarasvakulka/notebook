import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RootComponent, SidebarComponent, NoteEditorComponent } from './components';
import {RouterModule} from '@angular/router';
import {NotesService} from './services';
import {HttpClientModule} from '@angular/common/http';

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
    HttpClientModule
  ],
  providers: [NotesService],
  bootstrap: [RootComponent]
})
export class AppModule { }
