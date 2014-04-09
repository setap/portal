#! /bin/sh

export PATH=$PATH:/opt/node/node-v0.10.25-linux-x64/bin:/opt/mongodb/mongodb-linux-x86_64-2.4.9/bin
export OCI_HOME=/opt/instantclient
export NODE_PATH=.
export NLS_LANG=.UTF8
export DYLD_LIBRARY_PATH=/opt/instantclient

cd /opt/portal

case "$1" in
start) exec forever -a -l /opt/portal/logs/portal.log -o /opt/portal/logs/portal_output.log -e /opt/portal/logs/portal_errors.log --sourceDir=/opt/portal -p /opt/portal/forever/ start app.js
;;
stop) exec forever --sourceDir=./ stop app.js;;
*) echo "incorrect usage"
exit 1
;;
esac

echo "Portal start"

exit 0