//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Mongo = Package.mongo.Mongo;
var _ = Package.underscore._;
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var Router = Package['iron:router'].Router;
var RouteController = Package['iron:router'].RouteController;
var Iron = Package['iron:core'].Iron;

/* Package-scope variables */
var __coffeescriptShare;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/manuelschoebel_ms-seo/packages/manuelschoebel_ms-seo.js                                               //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
(function () {                                                                                                    // 1
                                                                                                                  // 2
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/manuelschoebel:ms-seo/seo_collection.coffee.js                                                     //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
this.SeoCollection = new Mongo.Collection('seo');                                                                 // 10
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  // 12
}).call(this);                                                                                                    // 13
                                                                                                                  // 14
                                                                                                                  // 15
                                                                                                                  // 16
                                                                                                                  // 17
                                                                                                                  // 18
                                                                                                                  // 19
(function () {                                                                                                    // 20
                                                                                                                  // 21
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/manuelschoebel:ms-seo/seo.coffee.js                                                                //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var SEO, escapeHtmlAttribute, getCurrentRouteName;                                                                // 29
                                                                                                                  // 30
SEO = {                                                                                                           // 31
  settings: {                                                                                                     // 32
    title: '',                                                                                                    // 33
    rel_author: '',                                                                                               // 34
    meta: [],                                                                                                     // 35
    og: [],                                                                                                       // 36
    twitter: [],                                                                                                  // 37
    ignore: {                                                                                                     // 38
      meta: ['fragment'],                                                                                         // 39
      link: ['stylesheet', 'icon', 'apple-touch-icon']                                                            // 40
    },                                                                                                            // 41
    auto: {                                                                                                       // 42
      twitter: true,                                                                                              // 43
      og: true,                                                                                                   // 44
      set: ['description', 'url', 'title']                                                                        // 45
    }                                                                                                             // 46
  },                                                                                                              // 47
  ignore: function(type, value) {                                                                                 // 48
    if (this.settings.ignore[type] && _.indexOf(this.settings.ignore[type], value) === -1) {                      // 49
      return this.settings.ignore[type].push(value);                                                              // 50
    }                                                                                                             // 51
  },                                                                                                              // 52
  config: function(settings) {                                                                                    // 53
    return _.extend(this.settings, settings);                                                                     // 54
  },                                                                                                              // 55
  set: function(options, clearBefore) {                                                                           // 56
    var currentRouter, k, l, link, m, meta, o, og, twitter, url, v, _i, _j, _k, _l, _len, _len1, _len2, _len3;    // 57
    if (clearBefore == null) {                                                                                    // 58
      clearBefore = true;                                                                                         // 59
    }                                                                                                             // 60
    if (clearBefore) {                                                                                            // 61
      this.clearAll();                                                                                            // 62
    }                                                                                                             // 63
    currentRouter = Router.current();                                                                             // 64
    if (currentRouter) {                                                                                          // 65
      url = Router.url(currentRouter.route.getName(), currentRouter.params);                                      // 66
    }                                                                                                             // 67
    meta = options.meta;                                                                                          // 68
    og = options.og;                                                                                              // 69
    link = options.link;                                                                                          // 70
    twitter = options.twitter;                                                                                    // 71
    if (options.title) {                                                                                          // 72
      this.setTitle(options.title);                                                                               // 73
    }                                                                                                             // 74
    if (options.url) {                                                                                            // 75
      this.setUrl(options.url);                                                                                   // 76
    } else if (url) {                                                                                             // 77
      this.setUrl(url);                                                                                           // 78
    }                                                                                                             // 79
    if (meta && _.isArray(meta)) {                                                                                // 80
      for (_i = 0, _len = meta.length; _i < _len; _i++) {                                                         // 81
        m = meta[_i];                                                                                             // 82
        this.setMeta("name='" + m.key + "'", m.value);                                                            // 83
      }                                                                                                           // 84
    } else if (meta && _.isObject(meta)) {                                                                        // 85
      for (k in meta) {                                                                                           // 86
        v = meta[k];                                                                                              // 87
        this.setMeta("name='" + k + "'", v);                                                                      // 88
      }                                                                                                           // 89
    }                                                                                                             // 90
    if (og && _.isArray(og)) {                                                                                    // 91
      for (_j = 0, _len1 = og.length; _j < _len1; _j++) {                                                         // 92
        o = og[_j];                                                                                               // 93
        this.setMeta("property='og:" + o.key + "'", o.value);                                                     // 94
      }                                                                                                           // 95
    } else if (og && _.isObject(og)) {                                                                            // 96
      for (k in og) {                                                                                             // 97
        v = og[k];                                                                                                // 98
        this.setMeta("property='og:" + k + "'", v);                                                               // 99
      }                                                                                                           // 100
    }                                                                                                             // 101
    if (link && _.isArray(link)) {                                                                                // 102
      for (_k = 0, _len2 = link.length; _k < _len2; _k++) {                                                       // 103
        l = link[_k];                                                                                             // 104
        this.setLink(l.rel, l.href);                                                                              // 105
      }                                                                                                           // 106
    } else if (link && _.isObject(link)) {                                                                        // 107
      for (k in link) {                                                                                           // 108
        v = link[k];                                                                                              // 109
        this.setLink(k, v);                                                                                       // 110
      }                                                                                                           // 111
    }                                                                                                             // 112
    if (twitter && _.isArray(twitter)) {                                                                          // 113
      for (_l = 0, _len3 = twitter.length; _l < _len3; _l++) {                                                    // 114
        o = twitter[_l];                                                                                          // 115
        this.setMeta("property='twitter:" + o.key + "'", o.value);                                                // 116
      }                                                                                                           // 117
    } else if (twitter && _.isObject(twitter)) {                                                                  // 118
      for (k in twitter) {                                                                                        // 119
        v = twitter[k];                                                                                           // 120
        this.setMeta("property='twitter:" + k + "'", v);                                                          // 121
      }                                                                                                           // 122
    }                                                                                                             // 123
    if (options.rel_author) {                                                                                     // 124
      return this.setLink('author', options.rel_author);                                                          // 125
    }                                                                                                             // 126
  },                                                                                                              // 127
  clearAll: function() {                                                                                          // 128
    var $l, $m, controlled, ignored, l, m, _i, _j, _len, _len1, _ref, _ref1;                                      // 129
    _ref = $("meta");                                                                                             // 130
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {                                                           // 131
      m = _ref[_i];                                                                                               // 132
      $m = $(m);                                                                                                  // 133
      controlled = $m.attr('name') || $m.attr('property');                                                        // 134
      ignored = false;                                                                                            // 135
      if ($m.attr('name') && _.indexOf(SEO.settings.ignore.meta, $m.attr('name')) > -1) {                         // 136
        ignored = true;                                                                                           // 137
      } else if ($m.attr('property') && _.indexOf(SEO.settings.ignore.meta, $m.attr('property')) > -1) {          // 138
        ignored = true;                                                                                           // 139
      }                                                                                                           // 140
      if (!ignored && controlled) {                                                                               // 141
        $m.remove();                                                                                              // 142
      }                                                                                                           // 143
    }                                                                                                             // 144
    _ref1 = $("link");                                                                                            // 145
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {                                                        // 146
      l = _ref1[_j];                                                                                              // 147
      $l = $(l);                                                                                                  // 148
      controlled = $l.attr('rel');                                                                                // 149
      if (_.indexOf(SEO.settings.ignore.link, $l.attr('rel')) === -1 && controlled) {                             // 150
        $l.remove();                                                                                              // 151
      }                                                                                                           // 152
    }                                                                                                             // 153
    this.set(this.settings, false);                                                                               // 154
    return this.setTitle(this.settings.title);                                                                    // 155
  },                                                                                                              // 156
  setTitle: function(title) {                                                                                     // 157
    document.title = title;                                                                                       // 158
    if (_.indexOf(this.settings.auto.set, 'title') !== -1) {                                                      // 159
      if (this.settings.auto.twitter) {                                                                           // 160
        this.setMeta('property="twitter:title"', title);                                                          // 161
      }                                                                                                           // 162
      if (this.settings.auto.og) {                                                                                // 163
        return this.setMeta('property="og:title"', title);                                                        // 164
      }                                                                                                           // 165
    }                                                                                                             // 166
  },                                                                                                              // 167
  setUrl: function(url) {                                                                                         // 168
    if (_.indexOf(this.settings.auto.set, 'url') !== -1) {                                                        // 169
      if (this.settings.auto.twitter) {                                                                           // 170
        this.setMeta('property="twitter:url"', url);                                                              // 171
      }                                                                                                           // 172
      if (this.settings.auto.og) {                                                                                // 173
        return this.setMeta('property="og:url"', url);                                                            // 174
      }                                                                                                           // 175
    }                                                                                                             // 176
  },                                                                                                              // 177
  setLink: function(rel, href, unique) {                                                                          // 178
    var h, _i, _len;                                                                                              // 179
    if (unique == null) {                                                                                         // 180
      unique = true;                                                                                              // 181
    }                                                                                                             // 182
    if (unique) {                                                                                                 // 183
      this.removeLink(rel);                                                                                       // 184
    }                                                                                                             // 185
    if (_.isArray(href)) {                                                                                        // 186
      for (_i = 0, _len = href.length; _i < _len; _i++) {                                                         // 187
        h = href[_i];                                                                                             // 188
        this.setLink(rel, h, false);                                                                              // 189
      }                                                                                                           // 190
      return;                                                                                                     // 191
    }                                                                                                             // 192
    if (href) {                                                                                                   // 193
      return $('head').append("<link rel='" + rel + "' href='" + href + "'>");                                    // 194
    }                                                                                                             // 195
  },                                                                                                              // 196
  removeLink: function(rel) {                                                                                     // 197
    return $("link[rel='" + rel + "']").remove();                                                                 // 198
  },                                                                                                              // 199
  setMeta: function(attr, content, unique) {                                                                      // 200
    var name, v, _i, _len;                                                                                        // 201
    if (unique == null) {                                                                                         // 202
      unique = true;                                                                                              // 203
    }                                                                                                             // 204
    if (unique) {                                                                                                 // 205
      this.removeMeta(attr);                                                                                      // 206
    }                                                                                                             // 207
    if (_.isArray(content)) {                                                                                     // 208
      for (_i = 0, _len = content.length; _i < _len; _i++) {                                                      // 209
        v = content[_i];                                                                                          // 210
        this.setMeta(attr, v, false);                                                                             // 211
      }                                                                                                           // 212
      return;                                                                                                     // 213
    }                                                                                                             // 214
    if (!content) {                                                                                               // 215
      return;                                                                                                     // 216
    }                                                                                                             // 217
    content = escapeHtmlAttribute(content);                                                                       // 218
    $('head').append("<meta " + attr + " content='" + content + "'>");                                            // 219
    name = attr.replace(/"|'/g, '').split('=')[1];                                                                // 220
    if (_.indexOf(this.settings.auto.set, name) !== -1) {                                                         // 221
      if (this.settings.auto.twitter) {                                                                           // 222
        this.setMeta("property='twitter:" + name + "'", content);                                                 // 223
      }                                                                                                           // 224
      if (this.settings.auto.og) {                                                                                // 225
        return this.setMeta("property='og:" + name + "'", content);                                               // 226
      }                                                                                                           // 227
    }                                                                                                             // 228
  },                                                                                                              // 229
  removeMeta: function(attr) {                                                                                    // 230
    return $("meta[" + attr + "]").remove();                                                                      // 231
  }                                                                                                               // 232
};                                                                                                                // 233
                                                                                                                  // 234
this.SEO = SEO;                                                                                                   // 235
                                                                                                                  // 236
escapeHtmlAttribute = function(string) {                                                                          // 237
  return ("" + string).replace(/'/g, "&apos;").replace(/"/g, "&quot;");                                           // 238
};                                                                                                                // 239
                                                                                                                  // 240
getCurrentRouteName = function() {                                                                                // 241
  var routeName, router;                                                                                          // 242
  router = Router.current();                                                                                      // 243
  if (!router) {                                                                                                  // 244
    return;                                                                                                       // 245
  }                                                                                                               // 246
  routeName = router.route.getName();                                                                             // 247
  return routeName;                                                                                               // 248
};                                                                                                                // 249
                                                                                                                  // 250
Deps.autorun(function() {                                                                                         // 251
  var currentRouteName;                                                                                           // 252
  currentRouteName = getCurrentRouteName();                                                                       // 253
  if (!currentRouteName) {                                                                                        // 254
    return;                                                                                                       // 255
  }                                                                                                               // 256
  return Meteor.subscribe('seoByRouteName', currentRouteName);                                                    // 257
});                                                                                                               // 258
                                                                                                                  // 259
Deps.autorun(function() {                                                                                         // 260
  var currentRouteName, settings;                                                                                 // 261
  if (!SEO) {                                                                                                     // 262
    return;                                                                                                       // 263
  }                                                                                                               // 264
  currentRouteName = getCurrentRouteName();                                                                       // 265
  settings = SeoCollection.findOne({                                                                              // 266
    route_name: currentRouteName                                                                                  // 267
  }) || {};                                                                                                       // 268
  return SEO.set(settings);                                                                                       // 269
});                                                                                                               // 270
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  // 272
}).call(this);                                                                                                    // 273
                                                                                                                  // 274
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['manuelschoebel:ms-seo'] = {};

})();
