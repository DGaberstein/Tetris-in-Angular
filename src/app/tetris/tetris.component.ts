import { Component, HostListener, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.css']
})
export class TetrisComponent implements OnInit {
  @Output() scoreUpdated = new EventEmitter<number>();
  @Output() gameOver = new EventEmitter<void>();
  cells: number[] = Array(200).fill(0);
  currentPiece: number[] = [];
  intervalId: any;
  score = 0;
  pieces = [
    [1, 11, 21, 2], // L-shape
    [0, 10, 20, 21], // Reverse L-shape
    [1, 11, 21, 31], // I-shape
    [0, 1, 10, 11], // O-shape
    [1, 11, 10, 20], // S-shape
    [0, 10, 11, 21], // Z-shape
    [0, 1, 11, 12] // T-shape
  ];

  constructor() { }

  ngOnInit(): void {
    console.log('TetrisComponent initialized');
    console.log('Cells array:', this.cells);
  }

  startGame(): void {
    this.resetGame();
    this.spawnPiece();
    this.intervalId = setInterval(() => {
      this.movePieceDown();
    }, 1000);
  }

  stopGame(): void {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  resetGame(): void {
    this.cells.fill(0);
    this.score = 0;
    this.scoreUpdated.emit(this.score);
  }

  spawnPiece(): void {
    const piece = this.pieces[Math.floor(Math.random() * this.pieces.length)];
    this.currentPiece = piece.map(index => index + 3);
    if (!this.isValidMove(this.currentPiece)) {
      this.gameOver.emit();
      clearInterval(this.intervalId);
    }
    this.drawPiece();
  }

  movePieceDown(): void {
    this.clearPiece();
    const newPiece = this.currentPiece.map(index => index + 10);
    if (this.isValidMove(newPiece)) {
      this.currentPiece = newPiece;
    } else {
      this.drawPiece();
      this.updateScore();
      this.clearLines();
      this.spawnPiece();
    }
    this.drawPiece();
    this.updateView();
  }

  movePieceLeft(): void {
    this.clearPiece();
    const newPiece = this.currentPiece.map(index => index - 1);
    if (this.isValidMove(newPiece)) {
      this.currentPiece = newPiece;
    }
    this.drawPiece();
  }

  movePieceRight(): void {
    this.clearPiece();
    const newPiece = this.currentPiece.map(index => index + 1);
    if (this.isValidMove(newPiece)) {
      this.currentPiece = newPiece;
    }
    this.drawPiece();
  }

  rotatePiece(): void {
    this.clearPiece();
    const newPiece = this.currentPiece.map((index, i) => {
      const x = index % 10;
      const y = Math.floor(index / 10);
      const newX = -y;
      const newY = x;
      return (newY + 1) * 10 + (newX + 1);
    });
    if (this.isValidMove(newPiece)) {
      this.currentPiece = newPiece;
    }
    this.drawPiece();
  }

  clearPiece(): void {
    this.currentPiece.forEach(index => this.cells[index] = 0);
  }

  drawPiece(): void {
    this.currentPiece.forEach(index => this.cells[index] = 1);
  }

  isValidMove(newPiece: number[]): boolean {
    return newPiece.every(index => index >= 0 && index < 200 && this.cells[index] === 0);
  }

  updateScore(): void {
    this.score += 10;
    this.scoreUpdated.emit(this.score);
  }

  clearLines(): void {
    let linesCleared = 0;
    for (let row = 0; row < 20; row++) {
      const start = row * 10;
      const end = start + 10;
      if (this.cells.slice(start, end).every(cell => cell === 1)) {
        this.animateLineClear(start, end);
        linesCleared++;
      }
    }
    if (linesCleared > 0) {
      setTimeout(() => {
        this.cells = this.cells.filter(cell => cell !== 2);
        this.cells.unshift(...Array(linesCleared * 10).fill(0));
        this.updateScore();
      }, 500); // Delay to allow animation to complete
    }
  }

  animateLineClear(start: number, end: number): void {
    for (let i = start; i < end; i++) {
      this.cells[i] = 2; // Mark cells for animation
    }
  }

  updateView(): void {
    // Trigger change detection to update the view
    this.cells = [...this.cells];
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (!this.intervalId) return;
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
      case 'ArrowUp':
      case 'w':
        this.rotatePiece();
        break;
    }
  }
}
