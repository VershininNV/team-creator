import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesComponent {

}
