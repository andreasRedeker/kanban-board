export class TaskDto {
  id?: string;
  title!: string;
  position?: number;
  description!: string;
  collectionId!: number;

  constructor(title: string, description: string, collectionId: number) {
    this.title = title;
    this.description = description;
    this.collectionId = collectionId;
  }
}