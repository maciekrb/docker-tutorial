#!/bin/sh

if [ "$APPENV" ]; then
  echo "Running with APPENV=$APPENV"
  # We can do more stuff here, say curl a config file or set up something 
  # before running the app, i.e:
  # if [ $APPENV == 'devel' ]; then
  #   export DEBUG=redis,client,device,manager
  # fi
fi

if [ "$1" = 'node' ]; then
  exec node echo.js
fi
exec "$@"
