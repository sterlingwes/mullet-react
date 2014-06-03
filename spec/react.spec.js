var React = require('../main.js').Renderer
  , cdata = {hello:'world'}
  , testTpl = __dirname + '/test.jsx'
  , react = new React('react', testTpl, cdata);

describe('ReactRenderer', function() {
    
    it('should instantiate properly', function() {
        expect(react.data).toEqual({hello:'world'});
        expect(react.path).toEqual(testTpl);
        expect(react.name).toEqual('react');
    });
    
    it('should return html from render()', function() {
        var html = react.render();
        expect(/<p[^>]+><span[^>]+>Hello <\/span><span[^>]+>world<\/span><span[^>]+>!<\/span><\/p>/.test(html)).toEqual(true);
    });
    
});