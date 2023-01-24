import * as z from 'zod';

const errorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.invalid_type) {
    if (issue.received === 'undefined' || issue.received === 'null') {
      return { message: 'required' };
    }
    return { message: 'invalid value' };
  }
  if (issue.code === z.ZodIssueCode.too_small) {
    if (issue.type === 'string') {
      return { message: `should contain at least ${issue.minimum} characters` };
    }
  }
  if (issue.code === z.ZodIssueCode.too_big) {
    if (issue.type === 'string') {
      return { message: `should contain at most ${issue.maximum} characters` };
    }
  }
  return { message: ctx.defaultError };
};

z.setErrorMap(errorMap);

export default z;