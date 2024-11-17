set -eu
rootDir=$(realpath `dirname $0`/../..)
set -x
npx commitlint --cwd "$rootDir" --to HEAD
