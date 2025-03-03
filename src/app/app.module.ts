import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { TetrisComponent } from './tetris/tetris.component';
import { TetrisBoardComponent } from './tetris/tetris-board.component';

@NgModule({
  declarations: [
    AppComponent,
    TetrisComponent,
    TetrisBoardComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
