const plugins = [
    [
        'babel-plugin-import',
        {
            'libraryName': '@material-ui/core',
            // Use "'libraryDirectory': ''," if your bundler does not support ES modules
            'libraryDirectory': 'esm',
            'camel2DashComponentName': false
        },
        'core'
    ],
    [
        'babel-plugin-import',
        {
            'libraryName': '@material-ui/icons',
            // Use "'libraryDirectory': ''," if your bundler does not support ES modules
            'libraryDirectory': 'esm',
            'camel2DashComponentName': false
        },
        'icons'
    ],
    [
        'babel-plugin-import',
        {
            'libraryName': 'lodash',
            // Use "'libraryDirectory': ''," if your bundler does not support ES modules
            'libraryDirectory': '',
            'camel2DashComponentName': false
        },
        'lodash'
    ]
];

module.exports = { plugins };
