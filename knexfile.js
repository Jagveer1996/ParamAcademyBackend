module.exports ={
  development:{
    client: "mysql2",
    connection :{
      host : "localhost",
      port : "3306",
      user : "root",
      password : "12345",
      database : "paramacademy"
    },
    migrations : {
      directory : "./migrations",
    },
    useNullAsDefault: true
  },
};