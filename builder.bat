@echo off
set lint=1
set min=1
set doc=1

:st
if not "%~1" == "" (
	if "%~1" == "--no-lint" set lint=0
	if "%~2" == "--no-lint" set lint=0
	if "%~3" == "--no-lint" set lint=0
	if "%~4" == "--no-lint" set lint=0
	if "%~1" == "--no-min" set min=0
	if "%~2" == "--no-min" set min=0
	if "%~3" == "--no-min" set min=0
	if "%~4" == "--no-min" set min=0
	if "%~1" == "--no-doc" set doc=0
	if "%~2" == "--no-doc" set doc=0
	if "%~3" == "--no-doc" set doc=0
	if "%~4" == "--no-doc" set doc=0
	if "%~1" == "-l" set min=0 & set doc=0
	if "%~2" == "-l" set min=0 & set doc=0
	if "%~1" == "-m" set lint=0 & set doc=0
	if "%~2" == "-m" set lint=0 & set doc=0
	if "%~1" == "-d" set lint=0 & set min=0
	if "%~2" == "-d" set lint=0 & set min=0
	if "%~1" == "1.0" goto v10
	if "%~1" == "1.1" goto v11
	if "%~1" == "1.2" goto v12
)
goto v11

rem EssenceJS 1.0
:v10
echo Building EssenceJS 1.0
cd 1.0
echo Linting ...
if %lint% == 1 eslint essence.js & echo Linting done -- (1/3)
if %lint% == 0 echo Lintement cancelled
ping localhost -n 1 > nul
echo Minifying ...
if %min% == 1 minify essence.js --no-comments & echo Minimisation done -- (2/3)
if %min% == 0 echo Minimisation cancelled
ping localhost -n 1 > nul
echo Documenting ...
cd ../
if %doc% == 1 jsdoc -d ./docs/1.0/ 1.0/essence.js & echo Documentation done -- (3/3)
if %doc% == 0 echo Documentation cancelled
goto done

rem EssenceJS 1.1
:v11
echo Building EssenceJS 1.1
cd 1.1

if %lint% == 1 (
    echo Linting ...
    eslint essence.js modules & csshint essence.css & echo Lint done
    ping localhost -n 1 > nul
)
if %min% == 1 (
    echo Minifying ...
    cd modules
    del /s /q *.min.js
    cd ../
    minify essence.js --no-comments & echo Essence.js minimised
    minify modules --no-comments & echo Modules minimised
    minify essence.css --no-comments & echo Minimisation done
    ping localhost -n 1 > nul
)
if %doc% == 1 (
    echo Documenting ...
    cd ../
    jsdoc -d ./docs/1.1/ 1.1/essence.js 1.1/modules & echo Documentation done
)

:done
echo Building complete !!
ping localhost -n 1 > nul
cd ../
exit /b

rem EssenceJS 1.2
:v12
echo Building EssenceJS 1.2
cd 1.2
echo Linting ...
if %lint% == 1 eslint essence.js modules
if %lint% == 1 csshint essence.css
echo Linting done -- (1/3)
ping localhost -n 1 > nul
echo Minifying ...
if %min% == 1 cd modules
if %min% == 1 del /S /Q *.min.js
if %min% == 1 cd ../
if %min% == 1 minify essence.js --no-comments
if %min% == 1 minify modules --no-comments
if %min% == 1 minify essence.css --no-comments
echo Minifying done -- (2/3)
ping localhost -n 1 > nul
echo Documenting ...
jsdoc --package package.json essence.js modules
echo Documenting done -- (3/3)
ping localhost -n 1 > nul
goto done

