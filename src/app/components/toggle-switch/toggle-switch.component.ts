import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleSwitchComponent {
  @Input() selected: boolean = true;
  @Output() onSwitched = new EventEmitter<boolean>();

  switch(event: Event): void {
    this.onSwitched.emit((event.currentTarget as HTMLInputElement).checked);
  }

}
