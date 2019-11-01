export class Contact {
  name: string;
  lastName: string;
  rol: string;
  imgUrl: string;

  constructor(name?: string, lastName?: string, rol?: string, imgUrl?: string) {
    this.name = name;
    this.lastName = lastName;
    this.rol = rol;
    this.imgUrl = imgUrl;
  }

}
