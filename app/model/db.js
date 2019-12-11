`use strict`;

var mysql = require(`mysql2`);

//local mysql db connection
function handleDisconnect() {
    connection = mysql.createConnection({
        host: `us-cdbr-iron-east-05.cleardb.net`,
        port: 3306,
        user: `b4d1a887c32dc7`,
        password: `f258bcbe`,
        database: `heroku_34a823f031d8525`
    }); 
                                                    
    connection.connect(function(err) {             
      if(err) {                                     
        setTimeout(handleDisconnect, 2000); 
      }                                     
    });                                    
                                            
    connection.on(`error`, function(err) {
        console.log(err.code);
      if(err.code === `PROTOCOL_CONNECTION_LOST`) {
        handleDisconnect();                         
      } else {                                     
        throw err;                                 
      }
    });
  }
  
  handleDisconnect();

module.exports = connection;