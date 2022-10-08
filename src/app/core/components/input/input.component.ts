import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() public inputControl!: FormControl;
  @Input() public value!: number;

  @Output() public firstValue: EventEmitter<number> = new EventEmitter<number>();

  public sendValue(event: any): void {
    this.firstValue.emit(event);
  }
}
