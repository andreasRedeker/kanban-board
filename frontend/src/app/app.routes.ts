import { Routes } from '@angular/router';
import { BoardOverviewComponent } from './board-overview/board-overview.component';
import { BoardComponent } from './board/board.component';
import { NotFoundComponent } from './core/not-found/not-found.component';

export const routes: Routes = [
    { path: '', component: BoardOverviewComponent },
    { path: 'board/:id', component: BoardComponent },
    { path: 'error', component: NotFoundComponent },
    { path: '**', component: NotFoundComponent }
];
