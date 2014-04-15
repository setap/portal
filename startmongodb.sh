 #! /bin/sh

 export PATH=$PATH:/opt/node/node-v0.10.25-linux-x64/bin:/opt/mongodb/mongodb-linux-x86_64-2.4.9/bin

 #exec /opt/mongodb/mongodb-linux-x86_64-2.4.9/bin/mongod --dbpath /opt/mongodb/db/

 exec /opt/mongodb/mongodb-linux-x86_64-2.4.9/bin/mongod --dbpath /opt/mongodb/db/ --fork --logpath /opt/portal/logs/mongod.log

 echo "MongoDB started"