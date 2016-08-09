@echo off
title [EssenceJS] Terminal
color 0A
eslint essence.js
pause
minify essence.js --no-comments
ping localhost -n 6
pause
