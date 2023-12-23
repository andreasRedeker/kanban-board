export class TaskDto {
  id?: string;
  title!: string;
  description!: string;
  collectionId!: number;

  constructor(title: string, description: string, collectionId: number) {
    this.title = title;
    this.description = description;
    this.collectionId = collectionId;
  }
}