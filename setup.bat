@ECHO OFF
ECHO Starting setup

ECHO Installing Node Packages
npm install

ECHO Node Packages Installed

ECHO Checking for configuration file

if exist mcversion.json (
  ECHO Config File Exists skipping creation
) else (
  ECHO Creating Configuration file
  @echo {"version":"snapshot","currentVersion":"1.13","downloadedVersion":"1.13","keepUpdated":false,"downloadUpdate":false,"filename":"server"} > mcversion.json
  ECHO Configuration file created
)

ECHO Setup complete!

PAUSE
