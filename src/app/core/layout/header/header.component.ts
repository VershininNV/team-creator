import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThemeSwitchComponent } from '@shared/ui/theme-switch/theme-switch.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ThemeSwitchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  
}
