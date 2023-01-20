class Validatecpf {
  constructor(cpf) {
    this.cpf = cpf;
    Object.defineProperty(this, "newCpf", {
      enumerable: true,
      configurable: false,
      value: this.cpf.replace(/\D+/g, ""),
      writable: false,
    });
  }
  validate() {
    if (typeof this.newCpf !== "string") false;
    if (!this.newCpf) false;
    if (this.newCpf.length !== 11) false;
    const digit1 = Validatecpf.calculateLastNumber(this.firstCalculateCpf());
    const digit2 = Validatecpf.calculateLastNumber(this.secondCalculateCpf());
    const cpf = this.removeTwoLastsNumbersCpf() + digit1 + digit2;
    const arr1 = cpf.split("").slice(0, 3);
    const arr2 = cpf.split("").slice(3, 6);
    const arr3 = cpf.split("").slice(6, 9);
    const arr4 = cpf.split("").slice(9, 11);
    Validatecpf.addCaracter(arr1, ".");
    Validatecpf.addCaracter(arr2, ".");
    Validatecpf.addCaracter(arr3, "-");
    const newarray = arr1.concat(arr2, arr3, arr4);
    const verificate = newarray.join("") !== this.cpf ? false : true;
    return verificate;
  }

  static addCaracter(arr, caracter) {
    return arr.push(caracter);
  }

  removeTwoLastsNumbersCpf() {
    return this.newCpf.slice(0, -2);
  }

  firstCalculateCpf() {
    const cpf = this.removeTwoLastsNumbersCpf();
    let max = 10;
    return cpf.split("").reduce((ac, val) => {
      ac += Number(val) * max;
      max--;
      return ac;
    }, 0);
  }

  static calculateLastNumber(digit) {
    const verificate = 11 - (digit % 11) > 9 ? 0 : 11 - (digit % 11);
    return verificate;
  }

  secondCalculateCpf() {
    const digit = String(
      Validatecpf.calculateLastNumber(this.firstCalculateCpf())
    );
    const cpf = this.removeTwoLastsNumbersCpf();
    const newCpf = cpf + digit;
    let max = 11;
    return newCpf.split("").reduce((ac, val) => {
      ac += Number(val) * max;
      max--;
      return ac;
    }, 0);
  }
}

const cpf = new Validatecpf("070.987.720-03");

console.log(cpf.validate());
