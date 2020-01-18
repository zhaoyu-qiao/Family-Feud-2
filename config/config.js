require('dotenv').config();

module.export = {
  "development": {
    "username": "root",
    "password": process.env.DB_PASS,
    "database": "familyfeud_db",
    "host": "localhost",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "SOTHISisgood1",
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "use_env_variable": process.env.JAWSDB_URL,
    "dialect": "mysql"

  }

}