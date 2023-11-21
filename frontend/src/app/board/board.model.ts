import { Collection } from "../collection/collection.model";

export class Board {
    id!: number;
    title!: string;
    description!: string;
    dateCreated!: string;
    collectionList!: Collection[];
}