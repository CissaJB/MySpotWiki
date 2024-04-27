import createError from "@fastify/error";

export const USER_EXIST = createError(
    'USER_EXIST',
    'The email is alredy used for another user',
    403 
);

export const TOKEN_NOTFOUND = createError(
    'TOKEN_NOTFOUND',
    'Missing identification token on the header of request',
    400
);

export const NOT_AUTHORIZED = createError(
    'NOT_AUTHORIZED',
    'This user does not exist or does not have permision to perform this request',
    401
);

export const NONE_EXISTENT_TOKEN = createError(
    'NONE_EXISTENT_TOKEN ',
    'The user you are trying to access does not exist',
    404
);

export const COMPONENT_EXIST = createError(
    'COMPONENT_EXIST',
    'The component you are trying to create alredy exist',
    400
);
export const DOESNT_EXIST = createError(
    'DOESNT_EXIST',
    'The component you are tring to acess is not present in the database',
    404
);