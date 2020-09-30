export const required = (value, t, fieldName) => {
  return {
    value: value,
    errorMessage: t('validation.required', {
      field: t(`form.${fieldName}`),
    }),
  };
};

export const minLength = (value, t, fieldName) => {
  return {
    value: value,
    errorMessage: t('validation.minLength', {
      field: t(`form.${fieldName}`),
      min: value,
    }),
  };
};
export const maxLength = (value, t, fieldName) => {
  return {
    value: value,
    errorMessage: t('validation.maxLength', {
      field: t(`form.${fieldName}`),
      max: value,
    }),
  };
};
