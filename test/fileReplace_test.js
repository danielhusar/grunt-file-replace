'use strict';

var grunt = require('grunt');
var fs = require('fs');

exports.fileReplace = {
  setUp: function (done) {
    // setup here if necessary
    done();
  },
  default_options: function (test) {
    test.expect(1);

    var actual = grunt.file.read('test/fixtures/123');
    var expected = grunt.file.read('test/expected/local');
    test.equal(actual, expected, 'Local file should be copied.');

    test.done();
  },
  custom_options: function (test) {
    test.expect(1);

    var actual = grunt.file.read('test/fixtures/123');
    var expected = grunt.file.read('test/expected/remote');
    test.equal(actual, expected, 'Remote file should be copied.');

    fs.unlinkSync('test/expected/local');
    fs.unlinkSync('test/expected/remote');

    test.done();
  }
};
