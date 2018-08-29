#!/bin/sh
num=$(find ./src -type f -name "*.md"  | xargs wc -m | grep total)
echo ""
echo "\033[36m-------------------------\033[0m"
echo "\033[36m 总字数 =$num\033[0m"
echo "\033[36m-------------------------\033[0m"
echo ""

exit 0