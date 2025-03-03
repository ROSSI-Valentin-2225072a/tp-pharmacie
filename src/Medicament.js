export class Medicament {
  constructor(medicamentJSON) {
    this._id = medicamentJSON.id;
    this._denomination = medicamentJSON.denomination;
    this._formepharmaceutique = medicamentJSON.formepharmaceutique;
    this._photo = medicamentJSON.photo;
    this._qte = medicamentJSON.qte;
  }

    get id() {
        return this._id;
    }

    get denomination() {
        return this._denomination;
    }

    get formepharmaceutique() {
        return this._formepharmaceutique;
    }

    get photo() {
        return this._photo;
    }

    get qte() {
        return this._qte;
    }

    ajouter() {
      this.qte++;
    }

    enlever() {
      this.qte--;
    }

    set denomination(denomination) {
        this._denomination = denomination;
    }

    set formepharmaceutique(formepharmaceutique) {
        this._formepharmaceutique = formepharmaceutique;
    }

    set photo(photo) {
        this._photo = photo;
    }
}