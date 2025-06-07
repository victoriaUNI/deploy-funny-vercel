require('dotenv').config();

module.exports = {
  // Configurações do banco de dados
  database: {
    url: process.env.DATABASE_URL || 'postgresql://autismo_db_ftev_user:9Qyy1dk3jJZgA6cpxpo0hmNmtuS1sbT8@dpg-d129t7buibrs73f0rav0-a/autismo_db_ftev',
    options: {
      dialect: 'postgres',
      protocol: 'postgres',
      dialectModule: require('pg'),
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        },
        keepAlive: true
      },
      pool: {
        max: 2,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      logging: false
    }
  },

  // Configurações da aplicação
  app: {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8080,
    jwtSecret: process.env.JWT_SECRET || 'segredo_super_secreto'
  },

  // Configurações de CORS
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }
}; 