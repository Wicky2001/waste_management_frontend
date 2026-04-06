import * as Joi from 'joi';

export type ValidationErrors<T extends Record<string, unknown>> = Partial<
  Record<keyof T | string, string>
>;

export const validateWithJoi = <T extends Record<string, unknown>>(
  schema: Joi.ObjectSchema<T>,
  values: T,
) => {
  const { error, value } = schema.validate(values, {
    abortEarly: false,
    allowUnknown: false,
    errors: {
      wrap: {
        label: false,
      },
    },
  });

  const errors: Record<string, string> = {};

  error?.details.forEach((detail) => {
    const field = detail.path.join('.');

    if (field && !errors[field]) {
      errors[field] = detail.message;
    }
  });

  return {
    errors: errors as ValidationErrors<T>,
    isValid: !error,
    value: value as T,
  };
};