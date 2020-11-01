db = db.getSiblingDB('formation')
db.createUser(
   {
     user: "user",
     pwd: "pass",
     roles: [ { role: "readWrite", db: "formation" }]
   }
)