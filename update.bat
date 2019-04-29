@ECHO OFF
::Add server batch file name here Make sure to have no spaces between serverStart and the = and filename.bat
set serverStart=run.bat

::EDIT ONLY ABOVE THIS
::===================================================================

ECHO Running Update script

node index.js

if exist "%serverStart%" (
  ECHO Starting Server
  %serverStart%
  ECHO Server Closed
  PAUSE
) else (
  ECHO This server start file does not exist
  PAUSE
  exit 1
)
