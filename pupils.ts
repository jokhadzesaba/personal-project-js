export { Pupils };
import { Person } from "./interfaces";
import { Shared } from "./shared";
class Pupils<T extends Person> extends Shared {
  private pupils: T[] = [];
  add(pupil: T): T {
    for (const phone of pupil.phones) {
      if (
        !this.validateNumber(
          phone.phone,
          /^(?:\+995\s?)?(?:5\d{2}\s?\d{2}\s?\d{2}\s?\d{2})$/
        )
      ) {
        throw new Error("Invalid phone number: " + phone.phone);
      }
    }
    if (!this.validateDateOfBirth(pupil.dateOfBirth, /^\d{4}-\d{2}-\d{2}$/)) {
      throw new Error("Invalid date of birth: " + pupil.dateOfBirth);
    }
    if (pupil.sex !== "male" && pupil.sex !== "female") {
      throw new Error("Invalid sex: " + pupil.sex);
    }

    this.validatePrimaryFlags(pupil.phones, "phones");
    const id = this.generateUniqueId(2, 8);
    const pupilWithId = { ...pupil, id };
    this.pupils.push(pupilWithId);
    return pupilWithId;
  }

  read(id: string): T {
    this.checkIfInArray(this.pupils, id);
    const foundPupils = this.pupils.filter((e) => e["id"] === id);
    if (foundPupils.length > 0) {
      return foundPupils[0];
    } else {
      throw new Error("Pupil not found");
    }
  }
  remove(id: string): void {
    this.checkIfInArray(this.pupils, id);
    this.pupils = this.pupils.filter((e) => e["id"] !== id);
  }
  update(id: string, updatedProfile: Partial<T>): void {
    this.checkIfInArray(this.pupils, id);
    const pupilIndex = this.pupils.findIndex((pupil) => pupil["id"] === id);
    if (pupilIndex !== -1) {
      const existingPupil = { ...this.pupils[pupilIndex] };
      if (updatedProfile.name) {
        existingPupil["name"] = updatedProfile["name"];
      }
      if (updatedProfile.dateOfBirth) {
        existingPupil["dateOfBirth"] = updatedProfile["dateOfBirth"];
      }
      if (updatedProfile.phones) {
        existingPupil["phones"] = updatedProfile["phones"];
      }
      if (updatedProfile.sex) {
        existingPupil["sex"] = updatedProfile["sex"];
      }
      if (updatedProfile.description !== undefined) {
        existingPupil["description"] = updatedProfile["description"];
      }
      this.pupils[pupilIndex] = existingPupil;
    } else {
      throw new Error("The pupil with this id does not exist");
    }
  }
}
// const pupils = new Pupils<Person>()