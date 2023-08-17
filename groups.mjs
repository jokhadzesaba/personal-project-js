import { Shared } from "./shared.mjs";
export { Groups };
class Groups extends Shared {
  #id;
  #idContainer;
  #map;
  constructor() {
    super();
    this.#map = new Map();
    this.#idContainer = [];
  }
  add(roomNumber) {
    this.checkNumber(roomNumber);
    const existingGroup = Array.from(this.#map.values()).find(
      (group) => group.room === roomNumber
    );
    if (existingGroup) {
      throw new Error("group with this room number exists already");
    }
    this.#id = this.generateUniqueId(2, 7);
    this.#idContainer.push(this.#id);
    let obj = { id: this.#id, room: roomNumber, pupils: [] };
    this.#map.set(this.#id, obj);
    return this.#id;
  }
  addPupil(groupId, pupil) {
    this.checkString(groupId);
    this.checkObject(pupil);
    this.#map.get(groupId).pupils.push(pupil);
  }
  removePupil(groupId, pupilId) {
    this.checkString(groupId);
    this.checkString(pupilId);
    const check = this.#map.has(groupId);
    const group = this.#map.get(groupId);
    console.log(group);
    if (!group) {
      throw new Error("this group ID does not exists");
    }
    const pupil = group.pupils.find((e) => e.id === pupilId);
    if (!pupil) {
      throw new Error("in this group there is no pupil with this id");
    }
    group.pupils = group.pupils.filter((e) => e.id !== pupilId);
  }
  update(groupId, obj) {
    this.checkString(groupId);
    this.checkObject(obj);
    this.checkIfInArray(this.#idContainer, groupId);
    if ("room" in obj) {
      this.#map.get(groupId).room = obj.room;
    }
  }
  read(id) {
    this.checkString(id);
    this.checkIfInArray(this.#idContainer, id);
    return this.#map.get(id);
  }
  readAll() {
    const allGroups = Array.from(this.#map.values());

    const simplifiedGroups = allGroups.map((group) => ({
      id: group.id,
      room: group.room,
      pupils: group.pupils,
    }));

    return JSON.stringify(simplifiedGroups, null, 2);
  }
}
