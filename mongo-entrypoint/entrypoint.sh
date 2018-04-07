#!/usr/bin/env bash
echo "Creating mongo users..."
mongo admin --host localhost -u root -p @123456%%^ --eval "db.createUser({user: 'commonuser', pwd: 'xyz123irqc$$*', roles: [{role: 'readWrite', db: 'ng5tohazsecuredemo'}]}); db.createUser({user: 'globaluser', pwd: 'abc123irqc$$*', roles: ['userAdminAnyDatabase', 'readWriteAnyDatabase']}); db.createUser({user: 'myUserAdmin', pwd: 'abc123$$', roles: [{role: 'userAdminAnyDatabase', db: 'admin'}]});"
echo "Mongo users created."