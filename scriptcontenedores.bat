@echo off

REM
cd grpcServidor
docker build -t grpcservidor .
IF %ERRORLEVEL% NEQ 0 EXIT /B %ERRORLEVEL%

REM
cd ..\serviciosNode
docker build -t servicios-node .
IF %ERRORLEVEL% NEQ 0 EXIT /B %ERRORLEVEL%

REM
cd ..\basededatos
docker build -t ventanillaenlinea_bd .
IF %ERRORLEVEL% NEQ 0 EXIT /B %ERRORLEVEL%

REM 
docker-compose build
IF %ERRORLEVEL% NEQ 0 EXIT /B %ERRORLEVEL%
docker-compose up