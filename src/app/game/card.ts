export class Card {
  private _id: number;
  private _image: string;
  private _reversed: boolean;

  constructor(id: number, image: string, reversed: boolean) {
    this._id = id;
    this._image = image;
    this._reversed = reversed;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get image(): string {
    if (!this.reversed) { return 'reverso'; }
    return this._image;
  }

  set image(value: string) {
    this._image = value;
  }

  get reversed(): boolean {
    return this._reversed;
  }

  set reversed(value: boolean) {
    this._reversed = value;
  }

  reverse(): void {
    this.reversed = !this.reversed;
  }

}
