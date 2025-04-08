const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  } else if (error.name ===  'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const auth = request.get('Authorization')
  if(auth && auth.toLowerCase().startsWith('bearer ')){
    request.token = auth.substring(7);
  } else {
    request.token = null;
  }


  next()
}

const userExtractor = async (request, response, next) => {
  try {
    const token = request.token; // El token ya ha sido extraído por tokenExtractor

    if (!token) {
      return response.status(401).json({ error: 'Token faltante o inválido' });
    }

    // Verifica el token y obtiene el decodedToken
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'Token inválido' });
    }

    // Busca el usuario en la base de datos y lo guarda en request.user
    const user = await User.findById(decodedToken.id);

    if (!user) {
      return response.status(401).json({ error: 'Usuario no encontrado' });
    }

    request.user = user; // Guarda el usuario en request
    next();
  } catch (error) {
    next(error); 
  }
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}