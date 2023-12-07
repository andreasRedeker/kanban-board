import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./core/navbar/navbar.component";
import { BoardComponent } from "./board/board.component";
import { ExampleComponent } from './example/example.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, NavbarComponent, BoardComponent, ExampleComponent]
})
export class AppComponent {
  title = 'frontend';
}
