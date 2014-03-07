'use strict';

var grunt = require('grunt');
var fs = require('fs');

exports.fileReplace = {
  setUp: function (done) {
    // setup here if necessary
    done();
  },
  patterns: function (test) {
    test.expect(2);

    var actual = grunt.file.read('./test/fixtures/123');

    var expected = grunt.file.read('./test/expected/local');
    test.equal(actual, expected, 'Local file should be copied.');

    expected = grunt.file.read('./test/expected/remote');
    test.equal(actual, expected, 'Remote file should be copied.');

    fs.unlinkSync('./test/expected/local');
    fs.unlinkSync('./test/expected/remote');

    test.done();
  }
};
