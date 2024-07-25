import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-employees-statistics',
  standalone: true,
  imports: [],
  templateUrl: './employees-statistics.component.html',
  styleUrl: './employees-statistics.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesStatisticsComponent {

}
