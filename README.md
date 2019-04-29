# MC Server Updater

## Setup
Make sure you have [NodeJS](https://nodejs.org/) installed.
Run the setup.bat file this will make sure all node packages are installed and that the configuration file is created.

### Set up your configuration file
Make sure to set your current version for the Minecraft server.
Make sure to set either latest or snapshot.
Make sure to set either keep updated or download update.

More information on the configuration file is below.

### Edit the update.bat file.
Edit the update.bat file with the bat file you use to run your server.


## Run
Run update.bat, as long as you have done the setup everything should be handled correctly, the downloads should commence and your server should run.


## Config File
Should be named mcversion.json, there is an example version included in the repo and a copy below.
```javascript
{
  "version":"snapshot",
  "currentVersion":"1.13",
  "downloadedVersion":"1.13",
  "keepUpdated":false,
  "downloadUpdate":false,
  "filename":"server"
}
```

The "version" property should contain either snapshot or latest.
->snapshot will always check for the most recent snapshot.
->latest will only check for the most recent full release.

The "currentVersion" property is the current version that the server is running on.
->This can be any proper version, either a snapshot or latest.

The "downloadedVersion" property is the most recent download from the program. This will be used along side downloadUpdate.
This property is used to identify if a newer version has been downloaded but not currently being used.

The "keepUpdated" property lets the program know to always download the latest version in the specified "version" property.
It will save it with the same name as the "filename" property.
This can be used so that the file name used in your run batch file that starts the server will be the same as the downloaded server file so it overwrites the old one and will always run the most recent version when you restart your server.

The "downloadUpdate" property is used for when "keepUpdated" is false. It will check to see if there is a newer version and if "downloadUpdate" is true it will download the file named as filename-versionNumber.jar. So this will allow a user to get the most recent version even if they currently aren't using it, allowing for easy manual update and no need to search for the new server files.

The "filename" property is much like it says, the program will name the server file the file name.
This should generally match the file name used in the server startup batch file.
