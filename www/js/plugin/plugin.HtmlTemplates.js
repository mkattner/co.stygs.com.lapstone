/**
 * Copyright (c) 2015 martin.kattner@stygs.com Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the
 * following conditions: The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var plugin_HtmlTemplates = {
  config: null,
  templates: {},
  constructor: function() {
    var dfd = $.Deferred();
    dfd.resolve();
    return dfd.promise();
  },
  pluginsLoaded: function() {
    app.debug.trace("plugin_HtmlTemplates.pluginsLoaded()");

    var dfd = $.Deferred(), promises = Array(), promiseOfPromises;

    $.each(plugin_HtmlTemplates.config.templates, function(key, template) {

      app.debug.validate(template.content);
      app.debug.validate(template.style);

      if (app.config.min) {
        styleUrl = template.style;
        styleUrl = styleUrl.substring(0, styleUrl.lastIndexOf("."));
        styleUrl = styleUrl.substring(0, styleUrl.lastIndexOf(".")) + "." + app.config.version.app + ".css";

        contentUrl = template.content;

        promises.push(globalLoader.AsyncTextLoader(contentUrl));
        promises.push(globalLoader.AsyncTextLoader(styleUrl));

      }

      else {
        promises.push(globalLoader.AsyncTextLoader(template.content));
        promises.push(globalLoader.AsyncTextLoader(template.style));
      }

    });

    promiseOfPromises = $.when.apply($, promises);

    promiseOfPromises.done(function() {
      var args = arguments, argumentsIndex = 0;

      $.each(plugin_HtmlTemplates.config.templates, function(key, template) {

        plugin_HtmlTemplates.templates[key] = {};
        // console.log(i + args[i]);
        plugin_HtmlTemplates.templates[key]['content'] = args[argumentsIndex];
        argumentsIndex++;

        plugin_HtmlTemplates.templates[key]['style'] = args[argumentsIndex];

        argumentsIndex++;
      });

      dfd.resolve();
    });
    promiseOfPromises.fail(function() {
      dfd.reject();
    });

    return dfd.promise();
  },

  // called after all pages are loaded
  pagesLoaded: function() {
    app.debug.trace("plugin_HtmlTemplates.pagesLoaded()");
    var dfd = $.Deferred();

    dfd.resolve();
    return dfd.promise();
  },

  definePluginEvents: function() {
  },

  // called by pages.js
  afterHtmlInjectedBeforePageComputing: function(container) {
    app.debug.trace("plugin_HtmlTemplates.afterHtmlInjectedBeforePageComputing()");
  },

  pageSpecificEvents: function(container) {
    app.debug.trace("plugin_HtmlTemplates.pageSpecificEvents()");
  },

  parseLess: function(data) {
    var css;
    try {
      less.render(data, {
        filename: "../files/template/xxx.less"
      }, function(error, output) {
        css = output.css;
        // output.imports = array of string filenames of the imports referenced
      });
    } catch (e) {
      alert(e);
    }
    return css;
  },

  getText: function(templateId) {
    app.debug.trace("plugin_HtmlTemplates.getText()");
    var text = null, style = null, styleIsActive;

    text = plugin_HtmlTemplates.templates[templateId]['content'];
    style = plugin_HtmlTemplates.templates[templateId]['style'];

    if (!app.config.min) {
      style = plugin_HtmlTemplates.parseLess(style);
    }

    styleIsActive = plugin_HtmlTemplates.templates[templateId]['styleIsActive'];

    if (styleIsActive == undefined) {
      styleIsActive = plugin_HtmlTemplates.templates[templateId]['styleIsActive'] = false;
    }

    if ($("style#lapstoneStyles")[0] == undefined) {
      $('head').append($("<style>").attr("id", "lapstoneStyles"));
    }

    if (styleIsActive === false) {
      $("style#lapstoneStyles").append(style);

      plugin_HtmlTemplates.templates[templateId]['styleIsActive'] = true;

    }
    app.debug.debug("plugin_HtmlTemplates.getText() - text: " + text);
    return text;
  },

  getElements: function(templateId) {
    app.debug.trace("plugin_HtmlTemplates.getElements()");
    var elements;

    elements = plugin_HtmlTemplates.config.templates[templateId]['elements'];

    if (elements == undefined) elements = {};

    app.debug.debug("plugin_HtmlTemplates.getElements() - elements: " + JSON.stringify(elements));

    return elements;
  },

  functions: {
    get: function(templateId) {
      app.debug.trace("plugin_HtmlTemplates.functions.get()");
      app.debug.debug("plugin_HtmlTemplates.functions.get() - templateId: " + templateId);
      var templateObject, extendObject;

      templateObject = $(plugin_HtmlTemplates.getText(templateId));
      extendObject = {};

      // extend the
      if (plugin_HtmlTemplates.config.templates[templateId].elements) {
        $.each(plugin_HtmlTemplates.config.templates[templateId].elements, function(elementKey, elementSelector) {
          extendObject["_" + elementKey] = function(contentObject) {
            if (contentObject) {
              return this.find(elementSelector).append(contentObject);
            } 
            
            else {
              return this.find(elementSelector);
            }
          }

        });
      }

      templateObject.extend(extendObject);

      return templateObject;
    },
    append: function(selector, templateId) {
      app.debug.trace("plugin_HtmlTemplates.functions.append()");
      $(selector).append(plugin_HtmlTemplates.functions.get(templateId));
    },
    prepend: function(selector, templateId) {
      app.debug.trace("plugin_HtmlTemplates.functions.prepend()");
      $(selector).prepend(plugin_HtmlTemplates.functions.get(templateId));
    },
    overwrite: function(selector, templateId) {
      app.debug.trace("plugin_HtmlTemplates.functions.overwrite()");
      app.debug.debug("plugin_HtmlTemplates.functions.overwrite() - selector: " + selector);
      app.debug.debug("plugin_HtmlTemplates.functions.overwrite() - templateId: " + templateId);
      $(selector).empty();
      $(selector).attr("data-context", templateId);
      $(selector).prepend(plugin_HtmlTemplates.functions.get(templateId));
      app.debug.debug("plugin_HtmlTemplates.functions.overwrite() - new html code: " + $(selector)[0].outerHTML);
    },
    elements: function(templateId) {
      app.debug.trace("plugin_HtmlTemplates.functions.elements()");
      return plugin_HtmlTemplates.getElements(templateId);
    }
  }
};