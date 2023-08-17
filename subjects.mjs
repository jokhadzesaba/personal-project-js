import { Shared } from "./shared.mjs";
export { Subjects };
class Subjects extends Shared {
  #id;
  #subjectsArray = [];
  #idArray = [];
  #map = new Map();
  add(obj) {
    this.checkObject(obj);
    let propNames = Object.getOwnPropertyNames(obj);
    if (propNames.length > 3 || propNames.length < 2) {
      throw new Error(
        "you need it needs at least 2, maximum 3 arguments(title,lessons,description(optional))"
      );
    }
    if (propNames.length === 3) {
      if (
        !propNames.includes("title") ||
        !propNames.includes("lessons") ||
        !propNames.includes("description")
      ) {
        throw new Error(
          "you need it needs at least 2, maximum 3 arguments(title,lessons,description(optional))"
        );
      } else {
        if (
          typeof obj.title !== "string" ||
          typeof obj.lessons !== "number" ||
          typeof obj.description !== "string"
        ) {
          throw new TypeError(
            "title and description must be string, lessons must be number"
          );
        }
      }
    } else {
      if ("title" in obj && "lessons" in obj) {
        if (typeof obj.title !== "string" || typeof obj.lessons !== "number") {
          throw new TypeError(
            "title and description must be string, lessons must be number"
          );
        }
      } else {
        throw new Error(
          "you need it needs at least 2, maximum 3 arguments(title,lessons,description(optional))"
        );
      }
    }
    if (this.#subjectsArray.some((e) => e.title === obj.title)) {
      throw new Error("this subject already exists");
    }
    this.#id = this.generateUniqueId(2, 5);
    obj.id = this.#id;
    this.#idArray.push(this.#id);
    this.#map.set(this.#id, obj);
    this.#subjectsArray.push(this.#map.get(this.#id));
    return this.#id;
  }
  remove(id) {
    this.checkString(id);
    this.checkIfInArray(this.#idArray, id);
    this.#map.delete(id);
    this.#idArray = this.#idArray.filter((e) => e !== id);
    this.#subjectsArray = this.#subjectsArray.filter((e) => e.id != id);
    return true;
  }
  verify(subject) {
    this.checkObject(subject);
    return this.#subjectsArray.some(
      (e) => e.title === subject.title && e.lessons === subject.lessons
    );
  }
  readAll() {
    return this.#subjectsArray;
  }
  read(id) {
    this.checkString(id);
    const subject = this.#subjectsArray.find((s) => s.id === id);
    return subject;
  }
}
