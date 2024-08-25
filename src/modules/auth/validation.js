import joi from 'joi';

export const signup = joi.object({

    firstName:joi.string().min(3).max(20).required(),
    lastName:joi.string().min(3).max(20).required(),
    userName:joi.string().alphanum().min(3).required(),
    email:joi.string().email().required(),
    password:joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
    cPassword:joi.string().valid(joi.ref("password")).required()
}).required()