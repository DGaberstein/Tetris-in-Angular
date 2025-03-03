import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tetris-board',
  templateUrl: './tetris-board.component.html',
  styleUrls: ['./tetris-board.component.css']
})
export class TetrisBoardComponent {
  @Input() cells: number[] = [];
}
