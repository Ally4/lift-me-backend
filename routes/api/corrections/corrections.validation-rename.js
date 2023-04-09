import { Joi } from 'celebrate'

// export const validate = Joi.object().keys({
//     name: Joi.string().trim().required()
//     .messages({
//         'string.base': `"name" should be of type 'text'`,
//         'string.empty': `"name" is required`,
//         'any.required': `name is required`
//     }),
//     description: Joi.string().trim().required()
//     .messages({
//         'string.base': `"description" should be of type 'text'`,
//         'string.empty': `"description" is required`,
//         'any.required': `description is required`
//     }),
//     image: Joi.string().trim()
//     .messages({
//         'string.base': `"image is required" should be of type 'text'`,
//         'string.empty': `"image is required" is required`,
//     }),
// })




// class ValidateCollection{

// static validate = (req, res, next) => {
//     try {
//       const validationSchema = Joi.object({
//         name: Joi.string().required(),
//         description: Joi.string().required(),
//         image: Joi.string().required(),
//       });
  
//       const { error } = validationSchema.validate(req.body);
//       if (error)
//         return failureResponse( res, 400, `This is the validation error: ${error.details[0].message.replace(/"/g,"")}!.`
//         );
//       return next();
//     } catch (error) {
//       return serverErrorResponse( res, 500, `This is the server error: ${error.details[0].message.replace(/"/g,"")}!.`
//       );
//     }
//   };
// }

// export default ValidateCollection;





 const theValidate = (req, res, next) => {
      try {
        const validationSchema = Joi.object({
          name: Joi.string().required(),
          description: Joi.string().required(),
          image: Joi.string().required(),
        });
    
        const { error } = validationSchema.validate(req.body);
        if (error)
        return res.status(400).json({
          status: 400,
          message: `This is a validation error: ${error.details[0].message.replace(/"/g,"")}!.`
        });
        return next();
      } catch (error) {
        return res.status(500).json({
          status: 500,
          message: `This is the server error: ${error.details[0].message.replace(/"/g,"")}!.`
        })
      }
    };
  
  export default theValidate;