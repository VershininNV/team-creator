import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TuiIslandModule } from '@taiga-ui/kit'
import { DashboardComponent } from './dashboard.component'
import { DashboardRoutingModule } from './dashboard-routing.module'
import { TeamsComponent } from './components/teams/teams.component'
import { EmployeesComponent } from './components/employees/employees.component'
import { TeamsStatisticsComponent } from './components/teams-statistics/teams-statistics.component'
import { EmployeesStatisticsComponent } from './components/employees-statistics/employees-statistics.component'

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    TuiIslandModule,
    DashboardRoutingModule,
    CommonModule,
    TeamsComponent,
    EmployeesComponent,
    TeamsStatisticsComponent,
    EmployeesStatisticsComponent
  ],
})
export class DashboardModule {}
