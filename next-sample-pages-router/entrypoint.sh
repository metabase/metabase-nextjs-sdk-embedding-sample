#!/bin/bash
set -e

if [ "$WATCH" = "true" ]; then
  npx next dev
else
  npx next start
fi
