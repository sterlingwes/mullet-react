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
 * ReactRenderer - renders react components server-side
 * 
 * - name, string representing component in dom (id)
 * - filepath, string to "entry.jsx"
 * - data, object to initialize component props
 */
function ReactRenderer(name, filepath, data) {
    
    this.name = name;
    this.path = filepath;
    this.data = data;

}

/*
 * ReactRenderer.render() - returns html of react component
 * 
 * - data, object (optional) to augment data with onRender
 */
ReactRenderer.prototype.render = function(data) {
    var component = sandbox(this.path);
    return React.renderComponentToString(component(_.extend(this.data, data || {})));
};


module.exports = ReactRenderer;