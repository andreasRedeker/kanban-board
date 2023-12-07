import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDragPlaceholder, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { animate } from '@angular/animations';


@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, CdkDropList, CdkDrag, CdkDragPlaceholder],
  templateUrl: './example.component.html',
  styleUrl: './example.component.css'
})
export class ExampleComponent {

  collections: any = []
  connectedTo: any = []

  constructor() {
    this.collections = [
      {
        id: 'Spalte1',
        tasks: [
          { name: "Task 1 (S1)"},
          { name: "Task 2 (S1)"},
        ],
      }, {
        id: 'Spalte2',
        tasks: [
          { name: "Task 3 (S2)"},
          { name: "Task 4 (S2)"},
        ],
      }, {
        id: 'Spalte3',
        tasks: [
          { name: "Task 3 (S2)"},
          { name: "Task 4 (S2)"},
        ],
      }
    ]

    for (let collection of this.collections) {
      this.connectedTo.push(collection.id)
    }

    console.log('example')
    console.log(this.collections)
    console.log(this.connectedTo)
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.updateItem(event);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  updateItem(input: any) {
    // console.log(input);
    console.log(`moved ${input.item.data.name} to ${input.container.id}`)
  }
}
