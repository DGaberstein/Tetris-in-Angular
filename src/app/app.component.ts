import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TetrisComponent } from './tetris/tetris.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TetrisComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tetris-angular';
  score = 0;
  isGameRunning = false;
  isGameOver = false;
  @ViewChild(TetrisComponent) tetrisComponent!: TetrisComponent;

  startGame(): void {
    this.isGameRunning = true;
    this.isGameOver = false;
    this.tetrisComponent.startGame();
  }

  restartGame(): void {
    this.isGameRunning = true;
    this.isGameOver = false;
    this.score = 0;
    this.tetrisComponent.startGame();
  }

  stopGame(): void {
    this.isGameRunning = false;
    this.tetrisComponent.stopGame();
  }

  updateScore(newScore: number): void {
    this.score = newScore;
  }

  handleGameOver(): void {
    this.isGameRunning = false;
    this.isGameOver = true;
  }
}
