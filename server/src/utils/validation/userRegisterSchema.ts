import joi from "joi";

export const resgiterSchema = joi.object({
 username: joi.string().min(3).required().messages({
  "string.empty": "Username must be a string",
  "any.required": "Username is required",
  "string.min":"min required length of username is 3"
 }),

 email: joi.string().email().required().messages({
  "string.email": "Email is not valid",
  "any.required": "Email is Required",
 }),

 password: joi
  .string()
  .pattern(
   new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
   )
  )
  .required()
  .messages({
   "string.pattern.base":
    "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long",
   "any.required": "Password is required",
  }),
});

export const loginSchema = joi.object({
 email: joi.string().email().required().messages({
  "string.email": "Email is not valid",
  "any.required": "Email is Required",
 }),

 password: joi
  .string()
  .required()
  .messages({
   "any.required": "Password is required",
  }),
});
