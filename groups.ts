export { Groups };
import { Shared } from "./shared";
class Groups extends Shared {
  private groups: Object[] = [];
  add(roomNumber: number): string {
    const id = this.generateUniqueId(2, 5);
    const groupWithId = { id: id, roomNumber: roomNumber, pupils: [] };
    this.groups.push(groupWithId);
    return id;
  }
  addPupil(groupId: string, pupil: object): void {
    this.checkIfInArray(this.groups, groupId);
    this.groups.map((group) => {
      if (group["id"] === groupId) {
        return {
          ...group,
          pupils: group["pupils"].push(pupil),
        };
      }
    });
  }
  removePupil(groupId: string, pupilId: string) {
    this.checkIfInArray(this.groups, groupId);
  }
  update(groupId: string, obj: { roomNumber: string }): void {
    this.checkIfInArray(this.groups, groupId);
    this.groups = this.groups.map((group) => {
      if (group["id"] === groupId) {
        return { ...group, roomNumber: obj.roomNumber };
      }
      throw new Error("something went wrong");
    });
  }
  read(id: string) {
    this.checkIfInArray(this.groups, id);
    const group = this.groups.filter((e) => e["id"] === id);
    return JSON.stringify(group);
  }
  readAll() {
    return JSON.stringify(this.groups);
  }
}
