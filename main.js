/*
 * # ReactRenderer
 * 
 * Renders react components server-side.
 * 
 * 
 */

var sandbox = require('enhanced-require')(module, {
    recursive:  true,
    cache:  false,

    module: {
        loaders: [
            { test: /\.jsx$/, loader: 'jsx' },
            { test: /\.svg/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
            { test: /\.ttf/, loader: 'url?limit=10000&mimetype=application/x-font-ttf' },
            { test: /\.otf/, loader: 'url?limit=10000&mimetype=application/x-font-opentype' },
            { test: /\.woff/, loader: 'url?limit=10000&mimetype=application/font-woff' },
            { test: /\.eot/, loader: 'url?limit=10000&mimetype=application/vnd.ms-fontobject' },
            { test: /\.gif/, loader: 'url?limit=10000&mimetype=image/gif' },
            { test: /\.png/, loader: 'url?limit=10000&mimetype=image/png' },
            { test: /\.less$/, loader: 'style!css!less' }
        ]
    },
    
    resolve: {
        root:   ['D:/Dev/Vagrant/node_modules', 'D:/Dev/Vagrant/bower_components', 'D:/Dev/Vagrant'],
        alias: {
            libs:       'D:/Dev/Vagrant/mulletapp/libs',
            reactjs:    'D:/Dev/Vagrant/mulletapp/node_modules/react/react.js',
            fs:         'D:/Dev/Vagrant/mulletapp/libs/fsblock',
            apps:       'D:/Dev/Vagrant/mulletapp/apps'
        },
        modulesDirectories: ['bower_components', 'node_modules']
    },
                                          
    resolveLoader: {
        alias: {
            style:  'D:/Dev/Vagrant/mulletapp/libs/styleblock',
            script: 'D:/Dev/Vagrant/mulletapp/libs/styleblock'
        }
    },
    
    substitutions: {
        'script!pace/pace.js': {},
        'script!imports?win=>window!jquery/dist/jquery': {},
        'style!css!pace/themes/pace-theme-flash.css' : {}
    },
    
    substitutionFactories: {}
});

var React = require('react')
  , _ = require('underscore')
  , EJSON = require('meteor-ejson');

/* 
 * ## ReactRenderer.constructor()
 * 
 * @param {String} name representing component in dom (id)
 * @param {String} filepath to "entry.jsx"
 * @param {Object} data to initialize component props
 */
function ReactRenderer(name, filepath, data) {
    
    this.name = name;
    this.path = filepath;
    this.data = EJSON.toJSONValue(data);

}

/*
 * ## ReactRenderer.component()
 * 
 * Fetches the React component exposed at designated path
 * 
 * @return {Object} a React component / class
 */
ReactRenderer.prototype.component = function() {
    return sandbox(this.path);
};

/*
 * ReactRenderer.render() - returns html of react component
 * 
 * @param {Object} data (optional) to augment data with onRender
 */
ReactRenderer.prototype.render = function(data) {
    var c = this.component();
    return React.renderComponentToString(c(_.extend(this.data, data || {})));
};


module.exports = {
    Renderer:   ReactRenderer
};