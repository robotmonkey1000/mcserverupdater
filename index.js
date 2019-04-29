var request = require( "request" ),
  baseUrl = " https://launchermeta.mojang.com/mc/game/",
  queryUrl = baseUrl + "version_manifest.json";
const fs = require( 'fs' );
const options = require( "./mcversion.json" );


function query( callback )
{
  return request( queryUrl, callback );
}

function url( version )
{
  return baseUrl + version + '/minecraft_server.' + version + '.jar';
}

function download( version, options )
{
  if ( !options )
  {
    options = {};
  }

  request( version.url, function( err, data )
  {
    if ( err )
    {
      console.error( error );
    }
    var inf;
    inf = JSON.parse( data.body );
    dwnURL = inf.downloads.server.url;
    request( dwnURL ).pipe( fs.createWriteStream( 'minecraft_server-' + version.id + '.jar' ) );
  } );

  return;
}

function keepUpdated( version )
{
  request( version.url, function( err, data )
  {
    if ( err )
    {
      console.error( error );
    }
    var inf;
    inf = JSON.parse( data.body );
    dwnURL = inf.downloads.server.url;
    request( dwnURL ).pipe( fs.createWriteStream( options.filename + '.jar' ) ).on( 'close', () =>
    {
      console.log( "Download Done!" );
      options.currentVersion = version.id;
      options.downloadedVersion = version.id;
      fs.writeFile( 'mcversion.json', JSON.stringify( options ), ( err ) =>
      {
        if ( err ) throw err;
      } );
    } );

  } );

}

function getUpdate( version )
{
  request( version.url, function( err, data )
  {
    if ( err )
    {
      console.error( error );
    }
    var inf;
    inf = JSON.parse( data.body );
    dwnURL = inf.downloads.server.url;
    request( dwnURL ).pipe( fs.createWriteStream( options.filename + version.id + '.jar' ) ).on( 'close', () =>
    {
      console.log( "Download Done!" );
      options.downloadedVersion = version.id;
      fs.writeFile( 'mcversion.json', JSON.stringify( options ), ( err ) =>
      {
        if ( err ) throw err;
      } );
    } );

  } );

}

function begin()
{
  if ( !options )
  {
    console.log( "No Configuration File!" );
    return -1;
  }
  query( ( err, data ) =>
  {
    if ( err )
    {
      console.log( err );
      return;
    }

    var versions = JSON.parse( data.body );
    if ( options.version == "snapshot" )
    {
      if ( options.currentVersion != versions.latest.snapshot )
      {
        console.log( "There is a newer snapshot version: " + versions.latest.snapshot );
        if ( options.keepUpdated )
        {
          console.log( "Downloading newest snapshot!" );
          var i = 0;
          var down;
          while ( versions.versions[ i ].id != versions.latest.snapshot )
          {
            i++;
          }
          down = versions.versions[ i ];
          keepUpdated( down );
        }
        else if ( options.downloadUpdate )
        {
          if ( options.downloadedVersion != versions.latest.snapshot )
          {
            console.log( "Downloading newer snapshot!" );
            var i = 0;
            var down;
            while ( versions.versions[ i ].id != versions.latest.snapshot )
            {
              i++;
            }
            down = versions.versions[ i ];
            getUpdate( down );
          }
          else
          {
            console.log( "You have already downloaded the latest snapshot!" );
          }
        }
      }
    }
    else if ( options.version == "latest" )
    {
      if ( options.currentVersion != versions.latest.latest )
      {
        console.log( "There is a newer full release: " + versions.latest.latest );

        if ( options.keepUpdated )
        {
          console.log( "Downloading newest release!" );
          var i = 0;
          var down;
          while ( versions.versions[ i ].id != versions.latest.latest )
          {
            i++;
          }
          down = versions.versions[ i ];
          keepUpdated( down );
        }
        else if ( options.downloadUpdate )
        {
          if ( options.downloadedVersion != versions.latest.latest )
          {
            console.log( "Downloading newest release!" );
            var i = 0;
            var down;
            while ( versions.versions[ i ].id != versions.latest.latest )
            {
              i++;
            }
            down = versions.versions[ i ];
            getUpdate( down );
          }
          else
          {
            console.log( "You have already downloaded the latest version!" );
          }
        }
      }
    }
  } );
}

begin();