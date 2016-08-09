@echo off

set branch=master

:st
if not "%~1" == "" (
  if /i "%~1" == "-b" set branch=%~2 & shift /2
  if /i "%~2" == "-b" set branch=%~3 & shift /2
  if /i "%~3" == "-b" set branch=%~4 & shift /2
  if /i "%~4" == "-b" set branch=%~5 & shift /2
  if /i "%~1" == "-?" goto help
  if /i "%~1" == "/?" goto help
  if /i "%~1" == "-i" goto init
  if /i "%~1" == "-u" goto main
  if /i "%~1" == "-d" goto dl
  if /i "%~1" == "-a" goto add
  if /i "%~1" == "-r" goto restore
  if "%~1" == "" goto main
  shift
  goto st
)

:help
echo Deploy a project to Github (or get it here)
echo Usages: deploy [-i] [project] [-b branch]
echo         deploy -d username@host:/path/to/repo
echo         deploy [-u^|-a [file]] [comment] [-b branch]
echo         deploy [comment] [-b branch]
echo         deploy [-r file^|-l [all^|change]]
echo.
echo   -i         Initialise and deploy (no need to specify -u)
echo   -u         Update the Github repo (same as no parameter)
echo   project    Name of the project
echo   -d         Download the project from Github
echo   username@host:/path/to/repo Place to get it (default: Berkmann18@github:[project])
echo   -a [file] [comment] Add a file with the corresponding commit message
echo   -b branch  Branch to deploy at
echo   -r file    File to restore from HEAD (if you messed something)
echo   -l [all^|change] Log, all logs or logs on the changes
exit /b

:init
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/Berkmann18/%~2
git remote -v
git push origin %branch%
exit /b

:main
git add *
if not "%~2" == "" git commit -m %~2
if "%~2" == "" git commit -m "Update"
git push origin %branch%
exit /b

:dl
git init
git pull
exit /b

:add
if not "%~2" == "" git add %~2
if "%~2" == "" git add *
if not "%~3" == "" git commit -m %~3
if "%~3" == "" git commit -m "Add file via upload"
goto main
exit /b

:restore
git checkout -- %~2
exit /b

:log
if "%~2" == "" git log --graph --oneline --decorate
if "%~2" == "all" git log --graph --oneline --decorate --all
if "%~2" == "change" git log --name-status
exit /b
