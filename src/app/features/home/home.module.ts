import { NgModule } from '@angular/core'
import { HomeRoutingModule } from './home-routing.module'
import { HomeComponent } from './home.component'
import { CommonModule } from '@angular/common'
import { TuiIslandModule } from '@taiga-ui/kit'

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    TuiIslandModule,
    HomeRoutingModule,
    CommonModule,
  ],
})
export class HomeModule {}
