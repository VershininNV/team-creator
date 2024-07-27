import { TuiIslandModule } from '@taiga-ui/kit';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-action-card',
  standalone: true,
  imports: [TuiIslandModule],
  templateUrl: './action-card.component.html',
  styleUrl: './action-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionCardComponent {
  @Input() cardLabel!: string
}
