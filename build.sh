#!/bin/bash

./node_modules/.bin/gitbook build src _book;

git checkout gh-pages;

cp -r _book/* .

git add --all;

git commit -m 'publish book';

git push origin gh-pages -f;

git checkout master;
