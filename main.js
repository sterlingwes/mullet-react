/*
 * # ReactRenderer
 * 
 * Renders react components server-side.
 * 
 * 
 */

var sandbox = require('enhanced-require')(module, {
    recursive:  true,

    module: {
        loaders: [
            { test: /\.jsx$/, loader: 'jsx' },
            { test: /\.gif/, loader: 'url?limit=10000&mimetype=image/gif' },
            { test: /\.less$/, loader: 'style!css!less' }
        ]
    },
    
    resolve: {
        root:   ['D:/Dev/Vagrant/node_modules', 'D:/Dev/Vagrant/bower_components', 'D:/Dev/Vagrant'],
        alias: {
            libs:   'D:/Dev/Vagrant/mulletapp/libs'
        },
        modulesDirectories: ['bower_components', 'node_modules', 'apps']
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
  , _ = require('underscore');

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
    this.data = data;

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