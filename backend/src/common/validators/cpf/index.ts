import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
} from 'class-validator';
import { CPFUtil } from 'src/common/utils';

@ValidatorConstraint({ name: 'IsCpf', async: false })
export class IsValueCpf implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(value: string, _: ValidationArguments) {
    try {
      const cpf = new CPFUtil();
      const regex =
        /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/;

      if (regex.test(value)) {
        const cpfStrip = cpf.strip(value);
        const isCpfValid = cpf.isValid(cpfStrip);
        const isValidCpf = cpf.verifierDigit(cpfStrip);

        if (isValidCpf === 0 && isCpfValid) return true;
      }

      return false;
    } catch {
      return false;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(_: ValidationArguments) {
    return 'invalid document sent cpf';
  }
}

export function IsCpf() {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsCpf',
      target: object.constructor,
      propertyName: propertyName,
      options: {},
      validator: IsValueCpf,
    });
  };
}
