/*
 * fileReplace
 * https://github.com/danielhusar/grunt-file-replace
 *
 * Copyright (c) 2014 Daniel Husar
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('fileReplace', 'Replaces the files from local or network source.', function () {

    var files = this.data;
    var done = this.async();

    var copyLocalFile = function(source, target, cb) {
      var cbCalled = false;

      var rd = fs.createReadStream(source);
      rd.on("error", function(err) {
        done(err);
      });
      var wr = fs.createWriteStream(target);
      wr.on("error", function(err) {
        done(err);
      });
      wr.on("close", function(ex) {
        done();
      });
      rd.pipe(wr);

      function done(err) {
        if (!cbCalled) {
          cb(err);
          cbCalled = true;
        }
      }
    };

    Object.keys(files).forEach(function(key) {
      copyLocalFile(key, files[key], function(err){
        if(!err){
          grunt.log.ok([files[key] + ' was replaced by: ' + key]);
        } else {
          grunt.log.error([key + ' probably doesnt exists.']);
        }
        //done();
      });
    });



  });

};
