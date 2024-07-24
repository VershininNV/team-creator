import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TuiIslandModule } from '@taiga-ui/kit'
import { DashboardComponent } from './dashboard.component'
import { DashboardRoutingModule } from './dashboard-routing.module'

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    TuiIslandModule,
    DashboardRoutingModule,
    CommonModule,
  ],
})
export class DashboardModule {}
