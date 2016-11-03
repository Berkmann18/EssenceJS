@echo off

set branch=master
set version=1.1

:st
if not "%~1" == "" (
  if /i "%~1" == "-b" set branch=%~2 & shift /2
  if /i "%~2" == "-b" set branch=%~3 & shift /2
  if /i "%~3" == "-b" set branch=%~4 & shift /2
  if /i "%~4" == "-b" set branch=%~5 & shift /2
  if /i "%~1" == "-v" set version=%~2 & shift /2
  if /i "%~2" == "-v" set version=%~3 & shift /2
  if /i "%~3" == "-v" set version=%~4 & shift /2
  if /i "%~4" == "-v" set version=%~5 & shift /2
  if /i "%~1" == "/?" goto help
  if /i "%~1" == "-h" goto help
  if /i "%~1" == "-i" goto init
  if /i "%~1" == "-u" goto main
  if /i "%~1" == "-d" goto dl
  if /i "%~1" == "-a" goto add
  if /i "%~1" == "-r" goto restore
  if /i "%~1" == "-l" goto log
  if "%~1" == "" goto main
  shift
  goto st
)

:help
echo Deploy a project to Github (or get it here)
echo Usages: deploy [-i] [project] [-b branch^|-v version]
echo         deploy -d username@host:/path/to/repo
echo         deploy [-u^|-a [file]] [comment] [-b branch]
echo         deploy [comment] [-b branch^|-v version]]
echo         deploy [-r file^|-l [all^|change]]
echo.
echo   -i         Initialise and deploy (no need to specify -u)
echo   -u         Update the Github repo (same as no parameter)
echo   project    Name of the project
echo   -d         Download the project from Github
echo   username@host:/path/to/repo Place to get it (default: Berkmann18@github:[project])
echo   -a [file] [comment] Add a file with the corresponding commit message
echo   -b branch  Branch to deploy at (default: master)
echo   -v version Version to deploy (default: 1.1)
echo   -r file    File to restore from HEAD (if you messed something)
echo   -l [^|all^|change] Log, all logs or logs on the changes
exit /b

:init
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/Berkmann18/EssenceJS
git remote -v
git push origin %branch%
exit /b

:main
git add *
if not "%~2" == "" git commit -F "%version%/updates.md" -m "%~2"
if "%~2" == "" git commit -F "%version%/updates.md" -m "Update"
git push origin %branch%
echo %tab%%tab%Git status
git status
exit /b

:dl
git init
git pull origin %branch% EssenceJS
exit /b

:add
if not "%~2" == "" git add %~2
if "%~2" == "" git add *
if not "%~3" == "" git commit -m "%~3"
if "%~3" == "" git commit -m "Add file via upload"
git push origin %branch%
exit /b

:restore
git checkout -- %~2
exit /b

:log
if "%~2" == "" git log --graph --oneline --decorate & exit /b
if "%~2" == "all" git log --graph --oneline --decorate --all & exit /b
if "%~2" == "change" git log --name-status & echo. & exit /b