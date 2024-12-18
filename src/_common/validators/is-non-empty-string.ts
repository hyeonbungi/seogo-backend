import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

export function IsNonEmptyString(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsNonEmptyString',
      target: object.constructor,
      propertyName,
      options: {
        message: `${propertyName}은(는) 비어있지 않은 문자열이어야 합니다.`,
        ...validationOptions,
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && value.trim().length > 0;
        },
      },
    });
  };
}
