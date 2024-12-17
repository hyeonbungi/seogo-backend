import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

interface FormattedError {
  property: string;
  errors: {
    [key: string]: string;
  };
}

export class ClassValidatorException extends BadRequestException {
  private formattedErrors: FormattedError[];

  constructor(public validationErrors: ValidationError[]) {
    super();
    this.formattedErrors = validationErrors.map((error) => ({
      property: error.property,
      errors: error.constraints,
    }));
  }

  getResponse() {
    return {
      statusCode: 400,
      message: `${this.formattedErrors.map((error) => error.property).join(', ')}은(는) 요청에 포함되면 안 됩니다.`,
      error: 'Bad Request',
    };
  }
}
