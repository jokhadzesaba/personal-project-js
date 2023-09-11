export { Shared };
abstract class Shared {
  abstract add(parameter: object | number | string): string | object;

  generateUniqueId(a: number, b: number): string {
    const randomPart: string = Math.random().toString(36).substr(a, b);
    return randomPart;
  }

  checkIfInArray(array: Object[], id: string): boolean {
    const check = array.find((e) => e["id"] === id);
    if (!check) {
      throw new Error("this id does not exists");
    }
    return true;
  }
  validateNumber<T extends string>(number: T, regexPattern: RegExp): boolean {
    return regexPattern.test(number);
  }

  validateEmail<T extends string>(email: T, regexPattern: RegExp): boolean {
    return regexPattern.test(email);
  }

  validatePrimaryFlags<T extends { primary: boolean }>(
    arr: T[],
    fieldName: string
  ): void {
    let hasPrimary = false;
    for (const item of arr) {
      if (item.primary) {
        if (hasPrimary) {
          throw new Error(`Multiple primary ${fieldName} detected.`);
        }
        hasPrimary = true;
      }
    }
  }
  validateDateOfBirth<T extends string>(
    dateOfBirth: T,
    regexPattern: RegExp
  ): boolean {
    return regexPattern.test(dateOfBirth);
  }
}
