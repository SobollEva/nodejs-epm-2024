import * as Joi from '@hapi/joi';

export const validationMiddleware = (schema) => { 
    return (req, res, next) => { 
    const validationResult: Joi.ValidationResult = schema.validate(req.body);
    
    if (validationResult.error) {
        res.status(400).json(errorResponse(validationResult.error.details))
    } else {
        next();
    }
  } 
}

function errorResponse(schemaErrors: any) {
    const errors = schemaErrors.map((error: Joi.ErrorReport) => {
        const { path, message } = error;
        return { path, message };
    });
    return {
        status: 'error',
        errors
    }
}