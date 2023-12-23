export class CollectionDto {
  title!: string;
  description!: string;
  boardId!: number;

  constructor(title: string, description: string, boardId: number) {
    this.title = title;
    this.description = description;
    this.boardId = boardId;
  }
}