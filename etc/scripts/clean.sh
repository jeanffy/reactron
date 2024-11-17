set -eu
rootDir=$(realpath `dirname $0`/../..)

set -x

rm -rf "$rootDir/.nx"

cleanProject() {
  rm -rf "$rootDir/$1/dist"
  rm -rf "$rootDir/$1/node_modules"
  rm -rf "$rootDir/$1/output"
}

cleanProject packages/ipc
cleanProject packages/main
cleanProject packages/preload
cleanProject packages/renderer
cleanProject .
