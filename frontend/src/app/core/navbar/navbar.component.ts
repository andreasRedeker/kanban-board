import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CreateBoardComponent } from '../../create-board/create-board.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SelectBoardComponent } from "../../select-board/select-board.component";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  imports: [CommonModule, MatButtonModule, MatIconModule, SelectBoardComponent, RouterLink]
})
export class NavbarComponent {
  private destroyRef = inject(DestroyRef);

  constructor(public router: Router, private dialog: MatDialog) { }

  openCreateBoardDialog(): void {
    const dialogRef = this.dialog.open(CreateBoardComponent, {
      minWidth: '400px'
    });

    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.dialog.closeAll();
    });
  }
}
