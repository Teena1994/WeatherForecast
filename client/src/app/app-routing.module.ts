import { NgModule } from '@angular/core';
import { WeatherComponent } from './app.component';
import { SearchHistoryComponent } from './search-history/search-history.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: WeatherComponent },
  { path: 'search_history', component: SearchHistoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
