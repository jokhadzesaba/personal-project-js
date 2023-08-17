import { Shared } from "./shared.mjs";
export { Pupils };
class Pupils extends Shared {
  #map;
  #id;
  #idContainer;
  #allInstance;
  constructor() {
    super();
    this.#map = new Map();
    this.#idContainer = [];
    this.#allInstance = [];
  }

  add(obj) {
    this.#id = this.generateUniqueId(2, 9);
    obj.id = this.#id;
    this.checkObject(obj);
    this.#validatePupilData(obj);
    this.#idContainer.push(this.#id);
    this.#map.set(this.#id, obj);
    this.#allInstance.push(this.#map.get(this.#id));
    return this.#map.get(this.#id);
  }
  #validatePupilData(data) {
    const allowedProperties = [
      "name",
      "dateOfBirth",
      "phones",
      "sex",
      "description",
      "id",
    ];

    if (typeof data !== "object" || Array.isArray(data)) {
      throw new TypeError("Object expected");
    }

    for (const prop in data) {
      if (!allowedProperties.includes(prop)) {
        throw new Error(`Invalid property: ${prop}`);
      }
    }

    this.validateProperty(data, "name", "object", (name) => {
      this.validateProperty(name, "first", "string");
      this.validateProperty(name, "last", "string");
    });

    this.validateProperty(data, "dateOfBirth", "string");
    this.validateProperty(data, "sex", "string");
    if (data.sex !== "male" && data.sex !== "female") {
      throw new Error("Invalid value for 'sex', must be 'male' or 'female'");
    }

    this.validateProperty(data, "description", "string");
    this.validateProperty(data, "id", "string");

    if ("phones" in data) {
      this.validatePhones(data.phones);
    }

    if ("dateOfBirth" in data) {
      this.validateDateOfBirth(data.dateOfBirth);
    }
  }
  read(id) {
    this.checkString(id);
    this.checkIfInArray(this.#idContainer, id);
    return this.#map.get(id);
  }

  update(id, obj) {
    this.checkString(id);
    this.checkObject(obj);
    let pupil = this.#map.get(id);
    for (let propName of Object.getOwnPropertyNames(obj)) {
      teacher[propName] = obj[propName];
      this.#validatePupilData(pupil);
    }
  }
}
