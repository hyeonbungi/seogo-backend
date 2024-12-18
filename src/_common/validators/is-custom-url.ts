import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import validator from 'validator';

export function IsCustomUrl(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsNonEmptyString',
      target: object.constructor,
      propertyName,
      options: {
        message: `${propertyName}은(는) URL 형태의 문자열이어야 합니다.`,
        ...validationOptions,
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && validator.isURL(value);
        },
      },
    });
  };
}
