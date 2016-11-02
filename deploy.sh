#!/bin/bash

branch="master"
version="1.1"

function st {
	if [ "$1" == "-b" -o "$1" == "--branch" ]; then
		branch="$2"
		shift 2
	elif [ "$2" == "-b" -o "$2" == "--branch" ]; then
		branch="$3"
		shift 2
	elif [ "$3" == "-b" -o "$3" == "--branch" ]; then
		branch="$4"
		shift 2
	elif [ "$4" == "-b" -o "$4" == "--branch" ]; then
		branch="$5"
		shift 2
    elif [ "$1" == "-v" -o "$1" == "--version" ]; then
		version="$2"
		shift 2
	elif [ "$2" == "-v" -o "$2" == "--version" ]; then
		version="$3"
		shift 2
	elif [ "$3" == "-v" -o "$3" == "--version" ]; then
		version="$4"
		shift 2
	elif [ "$4" == "-v" -o "$4" == "--version" ]; then
		version="$5"
		shift 2
	elif [ "$1" == "-h" -o "$1" == "--help" ]; then
		depHelp
	elif [ "$1" == "-i" -o "$1" == "--init" ]; then
		init
	elif [ "$1" == "-u" -o "$1" == "--update" ]; then
		update $2
	elif [ "$1" == "-d" -o "$1" == "--download" ]; then
		download $2
	elif [ "$1" == "-a" -o "$1" == "--add" ]; then
		add $2 $3
	elif [ "$1" == "-r" -o "$1" == "--restore" ]; then
		restore
	elif [ "$1" == "-l" -o "$1" == "--log" ]; then
		log $2
	else
		update $1
	fi
}

function depHelp {
	echo Deploy a project to Github
	echo Usages: dep [-i] [project] [-b branch]
	echo -e "\tdep -d username@host:/path/to/repo"
	echo -e "\tdep [-u|-a [file]] [comment] [-b branch|-v version]"
	echo -e "\tdep [comment] [-b branch|-v version]"
	echo -e "\tdep [-r file|-l [all|change]]\n"
	echo  "  -h, --help                  Display this help section."
	echo  "  -i, --init                  Initialise and deploy"
	echo  "  -u, --update                Update the Github repo"
	echo  "  project                     Name of the project"
	echo  "  -d, --download              Download the project from Github"
	echo  "  username@host:/path/to/repo Place to get it"
	echo  "  -a [file] [comment]         Add a file with the corresponding commit message"
	echo  "  --add ..."
	echo  "  -b branch, --branch branch  Branch to deploy at"
	echo  "  -v version, --version ver   Version deployed (e.g: 1.1)"
	echo  "  -r file, --restore file     File to restore from HEAD"
	echo  "  -l [|all|change]          Log, all logs or logs on the changes"
	echo  "  --list ..."
	echo  -e "\nIf you want to fill the body of the commit message, make sure that a markdown (.md) file (containing the body of the commit message) named either: update, updates, commit or message; is present on the current directory."
}

function init {
	git init
	#git clone "https://github.com/Berkmann18/EssenceJS"
	git add .
	git commit -m "Initial commit"
	git remote add origin "https://github.com/Berkmann18/EssenceJS"
	git remote -v
	git push origin $branch
}

function update {
	git add *
	if [ "$1" == "" -o -z "$1" ]; then
		git commit -F "$version/updates.md" -m "Update"
	else
		git commit -F "$version/updates.md" -m "$1"
	fi
	git push origin $branch
	echo -e "\n\t\tGit status\n"
	git status
}

function download {
	git init
	git pull origin $branch $1
}

function add {
	if ["$1" == ""]; then
		git add *
	else
		git add "$1"
	fi
	if ["$2" == ""]; then
		git commit -m "Add file via upload"
	else
		git commit -m "$2"
	fi
	git push origin $branch
}

function restore {
	git restore -- $1
}

function log {
	git checkout $branch
	if ["$1" == ""]; then
		git log --graph --oneline --decorate & echo ""
	elif ["$1" == "all"]; then
		git log --graph --oneline --decorate --all & echo ""
	else
		git log --name-status & echo ""
	fi
}

st "$1" "$2" "$3"