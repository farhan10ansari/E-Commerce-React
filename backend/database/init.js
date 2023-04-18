
const { Client } = require('pg')
let client;
client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'e-commerce-react',
    password: '5645',
    port: 5432,
  })
async function initDb()
{
    
      client.connect(function(err) {
        if (err) throw err;
        console.log("PG Database Connected!");
      });
      
}

module.exports={initDb:initDb,client:client}




