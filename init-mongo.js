db = db.getSiblingDB('admin')
db.auth('admin', 'admin')

db = db.getSiblingDB('masterDB')
db.createUser({
  user: 'admin',
  pwd: 'admin',
  roles: [{ role: 'readWrite', db: 'masterDB' }],
})
db.createCollection('users')
