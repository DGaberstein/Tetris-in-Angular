import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.css']
})
export class TetrisComponent implements OnInit {
  cells: number[] = Array(200).fill(0);
  currentPiece: number[] = [4, 14, 24, 34]; // Example piece (a vertical line)
  intervalId: any;

  constructor() { }

  ngOnInit(): void {
    console.log('TetrisComponent initialized');
    console.log('Cells array:', this.cells);
    this.startGame();
  }

  startGame(): void {
    this.intervalId = setInterval(() => {
      this.movePieceDown();
    }, 1000);
  }

  movePieceDown(): void {
    this.clearPiece();
    this.currentPiece = this.currentPiece.map(index => index + 10);
    this.drawPiece();
  }

  clearPiece(): void {
    this.currentPiece.forEach(index => this.cells[index] = 0);
  }

  drawPiece(): void {
    this.currentPiece.forEach(index => this.cells[index] = 1);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowLeft':
      case 'a':
        this.movePieceLeft();
        break;
      case 'ArrowRight':
      case 'd':
        this.movePieceRight();
        break;
      case 'ArrowDown':
      case 's':
        this.movePieceDown();
        break;
      case 'w':
        break;
    }
  }

  movePieceLeft(): void {
    this.clearPiece();
    this.currentPiece = this.currentPiece.map(index => index - 1);
    this.drawPiece();
  }

  movePieceRight(): void {
    this.clearPiece();
    this.currentPiece = this.currentPiece.map(index => index + 1);
    this.drawPiece();
  }
}
