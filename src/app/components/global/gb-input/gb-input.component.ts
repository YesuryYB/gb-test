// ##### IONIC & ANGULAR
import {
  Component,
  input,
  output,
  signal,
  OnInit,
  effect,
  computed,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import * as icons from 'ionicons/icons';

@Component({
  selector: 'gb-input',
  templateUrl: './gb-input.component.html',
  styleUrls: ['./gb-input.component.scss'],
  imports: [FormsModule, IonIcon],
})
export class GbInputComponent implements OnInit {
  constructor() {
    addIcons(icons);
    // ##### EFFECTS
    effect(() => {
      this.valueChange.emit(this.model());
    });
  }
  // ##### INPUTS
  type = input<'text' | 'password' | 'email' | 'number'>('text');
  placeholder = input('');
  value = input.required<string | number>();
  color = input('blue');
  level = input(500);
  icon = input<string>();
  disabled = input(false);
  extraClasses = input('');
  passwordToggle = input(false);

  // ##### SIGNALS
  model = signal<string | number>('');
  isShowingPassword = signal(false);
  inType = signal('');

  // ##### METHODS
  togglePass() {
    this.isShowingPassword.update(val => (val = !val));
    if (this.isShowingPassword()) this.inType.update(val => (val = 'text'));
    else this.inType.update(val => (val = 'password'));
  }

  // OUTPUTS
  valueChange = output<string | number>();

  // ##### COMPUTED
  classes = computed(() => {
    const c = this.color();
    const l = this.level();
    const d = this.level() - 200 < 25 ? 25 : this.level() - 200;
    let classes = `w-full bg-transparent rounded-md border border-stroke outline-none transition py-[10px] pr-3`;
    if (this.icon()) classes += ` pl-12`;
    else classes += ` pl-3`;
    classes += ` focus:border-gb-${c}-${l} disabled:bg-gray-6 disabled:border-gray-6`;
    classes += ` ${this.extraClasses()}`;
    return classes;
  });

  // ##### LC HOOKS
  ngOnInit(): void {
    this.model.update(val => (val = this.value()));
    this.inType.update(val => (val = this.type()));
  }
}
