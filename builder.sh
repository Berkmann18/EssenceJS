#!/bin/bash

lint=1
min=1
doc=1
version="1.1"

function st {
	if [ "$1" == "--no-lint" -o "$2" == "--no-lint" -o "$3" == "--no-lint" -o "$4" == "--no-lint" ]; then
        lint=0
	elif [ "$1" == "--no-min" -o "$2" == "--no-min" -o "$3" == "--no-min" -o "$4" == "--no-min" ]; then
        min=0
	elif [ "$1" == "--no-doc" -o "$2" == "--no-doc" -o "$3" == "--no-doc" -o "$4" == "--no-doc" ]; then
        doc=0
	elif [ "$1" == "-l" -o "$2" == "--lint" ]; then
        min=0
        doc=0
	elif [ "$1" == "-m" -o "$2" == "--min" ]; then
        lint=0
        doc=0
	elif [ "$1" == "-d" -o "$2" == "--doc" ]; then
        lint=0
        min=0
	elif [ "$1" == "1.0" -o "$1" == "1.1" -o "$1" == "1.2" ]; then
        version="$1"
	fi
    build
}

function finished {
    cd ../
    echo "Building of $version complete !!"
}
function build {
    if [ "$version" == "1.0" ]; then
        cd 1.0
        if [ ${lint} -eq 1 ]; then
            echo "Linting ..."
            eslint essence.js & echo "Linting done!"
        fi
        if [ ${min} -eq 1 ]; then
            echo "Minimisation ..."
            minify essence.js --no-comments & echo "Minimisation done!"
        fi
        if [ ${doc} -eq 1 ]; then
            echo "Documentation ..."
            jsdoc -d ./docs/1.0/ 1.0/essence.js & echo "Documentation done!"
        fi
        finished
    elif [ "$version" == "1.1" ]; then
        cd 1.1
        if [ ${lint} -eq 1 ]; then
            echo "Linting ..."
            eslint essence.js modules & csslint essence.css & echo "Linting done!"
        fi
        if [ ${min} -eq 1 ]; then
            echo "Minimisation ..."
            rm modules/*.min.js
            minify essence.js --no-comments & minify modules --no-comments & echo ".js scripts minimised"
            minify essence.css --no-comments & echo "Minimisation done!"
        fi
        if [ ${doc} -eq 1 ]; then
            echo "Documentation ..."
            cd ../
            jsdoc -d ./docs/1.1/ 1.1/essence.js 1.1/modules & cd 1.1
        fi
        finished
    else
        cd 1.2
        if [ ${lint} -eq 1 ]; then
            echo "Linting ..."
            eslint essence.js & csslint essence.css & echo "Linting done!"
        fi
        if [ ${min} -eq 1 ]; then
            echo "Minimisation ..."
            rm modules/*.min.js
            minify essence.js modules --no-comments & echo ".js scripts minimised"
            minify essence.css --no-comments & echo "Minimisation done!"
        fi
        if [ ${doc} -eq 1 ]; then
            echo "Documentation ..."
            jsdoc --package package.json essence.js modules
        fi
        finished
    fi
}
st $1 $2 $3 $4