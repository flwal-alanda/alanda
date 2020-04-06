module.exports = {
  name: 'alanda-ui-demo',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/alanda-ui-demo',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
