(function() {
    var e = [].indexOf || function(e) {
            for (var t = 0, n = this.length; t < n; t++)
                if (t in this && this[t] === e) return t;
            return -1
        },
        t = [].slice;
    ! function(e, t) {
        "function" == typeof define && define.amd ? define("waypoints", ["jquery"], function(n) {
            return t(n, e)
        }) : t(e.jQuery, e)
    }(window, function(n, o) {
        var i, r, a, l, s, c, u, f, d, h, p, m, g, v, w, y;
        return i = n(o), f = e.call(o, "ontouchstart") >= 0, l = {
            horizontal: {},
            vertical: {}
        }, s = 1, u = {}, c = "waypoints-context-id", p = "resize.waypoints", m = "scroll.waypoints", g = 1, v = "waypoints-waypoint-ids", w = "waypoint", y = "waypoints", r = function() {
            function e(e) {
                var t = this;
                this.$element = e, this.element = e[0], this.didResize = !1, this.didScroll = !1, this.id = "context" + s++, this.oldScroll = {
                    x: e.scrollLeft(),
                    y: e.scrollTop()
                }, this.waypoints = {
                    horizontal: {},
                    vertical: {}
                }, this.element[c] = this.id, u[this.id] = this, e.bind(m, function() {
                    var e;
                    if (!t.didScroll && !f) return t.didScroll = !0, e = function() {
                        return t.doScroll(), t.didScroll = !1
                    }, o.setTimeout(e, n[y].settings.scrollThrottle)
                }), e.bind(p, function() {
                    var e;
                    if (!t.didResize) return t.didResize = !0, e = function() {
                        return n[y]("refresh"), t.didResize = !1
                    }, o.setTimeout(e, n[y].settings.resizeThrottle)
                })
            }
            return e.prototype.doScroll = function() {
                var e, t = this;
                return e = {
                    horizontal: {
                        newScroll: this.$element.scrollLeft(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left"
                    },
                    vertical: {
                        newScroll: this.$element.scrollTop(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up"
                    }
                }, !f || e.vertical.oldScroll && e.vertical.newScroll || n[y]("refresh"), n.each(e, function(e, o) {
                    var i, r, a;
                    return a = [], r = o.newScroll > o.oldScroll, i = r ? o.forward : o.backward, n.each(t.waypoints[e], function(e, t) {
                        var n, i;
                        return o.oldScroll < (n = t.offset) && n <= o.newScroll ? a.push(t) : o.newScroll < (i = t.offset) && i <= o.oldScroll ? a.push(t) : void 0
                    }), a.sort(function(e, t) {
                        return e.offset - t.offset
                    }), r || a.reverse(), n.each(a, function(e, t) {
                        if (t.options.continuous || e === a.length - 1) return t.trigger([i])
                    })
                }), this.oldScroll = {
                    x: e.horizontal.newScroll,
                    y: e.vertical.newScroll
                }
            }, e.prototype.refresh = function() {
                var e, t, o, i = this;
                return o = n.isWindow(this.element), t = this.$element.offset(), this.doScroll(), e = {
                    horizontal: {
                        contextOffset: o ? 0 : t.left,
                        contextScroll: o ? 0 : this.oldScroll.x,
                        contextDimension: this.$element.width(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left",
                        offsetProp: "left"
                    },
                    vertical: {
                        contextOffset: o ? 0 : t.top,
                        contextScroll: o ? 0 : this.oldScroll.y,
                        contextDimension: o ? n[y]("viewportHeight") : this.$element.height(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up",
                        offsetProp: "top"
                    }
                }, n.each(e, function(e, t) {
                    return n.each(i.waypoints[e], function(e, o) {
                        var i, r, a, l, s;
                        if (i = o.options.offset, a = o.offset, r = n.isWindow(o.element) ? 0 : o.$element.offset()[t.offsetProp], n.isFunction(i) ? i = i.apply(o.element) : "string" == typeof i && (i = parseFloat(i), o.options.offset.indexOf("%") > -1 && (i = Math.ceil(t.contextDimension * i / 100))), o.offset = r - t.contextOffset + t.contextScroll - i, (!o.options.onlyOnScroll || null == a) && o.enabled) return null !== a && a < (l = t.oldScroll) && l <= o.offset ? o.trigger([t.backward]) : null !== a && a > (s = t.oldScroll) && s >= o.offset ? o.trigger([t.forward]) : null === a && t.oldScroll >= o.offset ? o.trigger([t.forward]) : void 0
                    })
                })
            }, e.prototype.checkEmpty = function() {
                if (n.isEmptyObject(this.waypoints.horizontal) && n.isEmptyObject(this.waypoints.vertical)) return this.$element.unbind([p, m].join(" ")), delete u[this.id]
            }, e
        }(), a = function() {
            function e(e, t, o) {
                var i, r;
                "bottom-in-view" === o.offset && (o.offset = function() {
                    var e;
                    return e = n[y]("viewportHeight"), n.isWindow(t.element) || (e = t.$element.height()), e - n(this).outerHeight()
                }), this.$element = e, this.element = e[0], this.axis = o.horizontal ? "horizontal" : "vertical", this.callback = o.handler, this.context = t, this.enabled = o.enabled, this.id = "waypoints" + g++, this.offset = null, this.options = o, t.waypoints[this.axis][this.id] = this, l[this.axis][this.id] = this, i = null != (r = this.element[v]) ? r : [], i.push(this.id), this.element[v] = i
            }
            return e.prototype.trigger = function(e) {
                if (this.enabled) return null != this.callback && this.callback.apply(this.element, e), this.options.triggerOnce ? this.destroy() : void 0
            }, e.prototype.disable = function() {
                return this.enabled = !1
            }, e.prototype.enable = function() {
                return this.context.refresh(), this.enabled = !0
            }, e.prototype.destroy = function() {
                return delete l[this.axis][this.id], delete this.context.waypoints[this.axis][this.id], this.context.checkEmpty()
            }, e.getWaypointsByElement = function(e) {
                var t, o;
                return (o = e[v]) ? (t = n.extend({}, l.horizontal, l.vertical), n.map(o, function(e) {
                    return t[e]
                })) : []
            }, e
        }(), h = {
            init: function(e, t) {
                return t = n.extend({}, n.fn[w].defaults, t), null == t.handler && (t.handler = e), this.each(function() {
                    var e, o, i, l;
                    return e = n(this), i = null != (l = t.context) ? l : n.fn[w].defaults.context, n.isWindow(i) || (i = e.closest(i)), i = n(i), o = u[i[0][c]], o || (o = new r(i)), new a(e, o, t)
                }), n[y]("refresh"), this
            },
            disable: function() {
                return h._invoke.call(this, "disable")
            },
            enable: function() {
                return h._invoke.call(this, "enable")
            },
            destroy: function() {
                return h._invoke.call(this, "destroy")
            },
            prev: function(e, t) {
                return h._traverse.call(this, e, t, function(e, t, n) {
                    if (t > 0) return e.push(n[t - 1])
                })
            },
            next: function(e, t) {
                return h._traverse.call(this, e, t, function(e, t, n) {
                    if (t < n.length - 1) return e.push(n[t + 1])
                })
            },
            _traverse: function(e, t, i) {
                var r, a;
                return null == e && (e = "vertical"), null == t && (t = o), a = d.aggregate(t), r = [], this.each(function() {
                    var t;
                    return t = n.inArray(this, a[e]), i(r, t, a[e])
                }), this.pushStack(r)
            },
            _invoke: function(e) {
                return this.each(function() {
                    var t;
                    return t = a.getWaypointsByElement(this), n.each(t, function(t, n) {
                        return n[e](), !0
                    })
                }), this
            }
        }, n.fn[w] = function() {
            var e, o;
            return o = arguments[0], e = 2 <= arguments.length ? t.call(arguments, 1) : [], h[o] ? h[o].apply(this, e) : n.isFunction(o) ? h.init.apply(this, arguments) : n.isPlainObject(o) ? h.init.apply(this, [null, o]) : o ? n.error("The " + o + " method does not exist in jQuery Waypoints.") : n.error("jQuery Waypoints needs a callback function or handler option.")
        }, n.fn[w].defaults = {
            context: o,
            continuous: !0,
            enabled: !0,
            horizontal: !1,
            offset: 0,
            triggerOnce: !1
        }, d = {
            refresh: function() {
                return n.each(u, function(e, t) {
                    return t.refresh()
                })
            },
            viewportHeight: function() {
                var e;
                return null != (e = o.innerHeight) ? e : i.height()
            },
            aggregate: function(e) {
                var t, o, i;
                return t = l, e && (t = null != (i = u[n(e)[0][c]]) ? i.waypoints : void 0), t ? (o = {
                    horizontal: [],
                    vertical: []
                }, n.each(o, function(e, i) {
                    return n.each(t[e], function(e, t) {
                        return i.push(t)
                    }), i.sort(function(e, t) {
                        return e.offset - t.offset
                    }), o[e] = n.map(i, function(e) {
                        return e.element
                    }), o[e] = n.unique(o[e])
                }), o) : []
            },
            above: function(e) {
                return null == e && (e = o), d._filter(e, "vertical", function(e, t) {
                    return t.offset <= e.oldScroll.y
                })
            },
            below: function(e) {
                return null == e && (e = o), d._filter(e, "vertical", function(e, t) {
                    return t.offset > e.oldScroll.y
                })
            },
            left: function(e) {
                return null == e && (e = o), d._filter(e, "horizontal", function(e, t) {
                    return t.offset <= e.oldScroll.x
                })
            },
            right: function(e) {
                return null == e && (e = o), d._filter(e, "horizontal", function(e, t) {
                    return t.offset > e.oldScroll.x
                })
            },
            enable: function() {
                return d._invoke("enable")
            },
            disable: function() {
                return d._invoke("disable")
            },
            destroy: function() {
                return d._invoke("destroy")
            },
            extendFn: function(e, t) {
                return h[e] = t
            },
            _invoke: function(e) {
                var t;
                return t = n.extend({}, l.vertical, l.horizontal), n.each(t, function(t, n) {
                    return n[e](), !0
                })
            },
            _filter: function(e, t, o) {
                var i, r;
                return (i = u[n(e)[0][c]]) ? (r = [], n.each(i.waypoints[t], function(e, t) {
                    if (o(i, t)) return r.push(t)
                }), r.sort(function(e, t) {
                    return e.offset - t.offset
                }), n.map(r, function(e) {
                    return e.element
                })) : []
            }
        }, n[y] = function() {
            var e, n;
            return n = arguments[0], e = 2 <= arguments.length ? t.call(arguments, 1) : [], d[n] ? d[n].apply(null, e) : d.aggregate.call(null, n)
        }, n[y].settings = {
            resizeThrottle: 100,
            scrollThrottle: 30
        }, i.on("load.waypoints", function() {
            return n[y]("refresh")
        })
    })
}).call(this),
    function() {
        ! function(e, t) {
            "function" == typeof define && define.amd ? define(["jquery", "waypoints"], t) : t(e.jQuery)
        }(window, function(e) {
            var t, n;
            return t = {
                wrapper: '<div class="sticky-wrapper" />',
                stuckClass: "stuck",
                direction: "down right"
            }, n = function(e, t) {
                var n;
                return e.wrap(t.wrapper), n = e.parent(), n.data("isWaypointStickyWrapper", !0)
            }, e.waypoints("extendFn", "sticky", function(o) {
                var i, r, a;
                return r = e.extend({}, e.fn.waypoint.defaults, t, o), i = n(this, r), a = r.handler, r.handler = function(t) {
                    var n, o;
                    if (n = e(this).children(":first"), o = -1 !== r.direction.indexOf(t), n.toggleClass(r.stuckClass, o), i.height(o ? n.outerHeight() : ""), null != a) return a.call(this, t)
                }, i.waypoint(r), this.data("stuckClass", r.stuckClass)
            }), e.waypoints("extendFn", "unsticky", function() {
                var e;
                return e = this.parent(), e.data("isWaypointStickyWrapper") ? (e.waypoint("destroy"), this.unwrap(), this.removeClass(this.data("stuckClass"))) : this
            })
        })
    }.call(this),
    function() {
        ! function(e) {
            e.fn.buddySystem = function() {
                return this.each(function() {
                    return e(this).html(e(this).html().replace(new RegExp("((?:[^ ]* ){" + ((e(this).html().match(/\s/g) || []).length - 1) + "}[^ ]*) "), "$1&nbsp;"))
                })
            }
        }(jQuery)
    }.call(this), window.Modernizr = function(e, t, n) {
        function o(e) {
            p.cssText = e
        }

        function i(e, t) {
            return typeof e === t
        }

        function r(e, t) {
            return !!~("" + e).indexOf(t)
        }

        function a(e, t) {
            for (var o in e) {
                var i = e[o];
                if (!r(i, "-") && p[i] !== n) return "pfx" != t || i
            }
            return !1
        }

        function l(e, t, o) {
            for (var r in e) {
                var a = t[e[r]];
                if (a !== n) return !1 === o ? e[r] : i(a, "function") ? a.bind(o || t) : a
            }
            return !1
        }

        function s(e, t, n) {
            var o = e.charAt(0).toUpperCase() + e.slice(1),
                r = (e + " " + g.join(o + " ") + o).split(" ");
            return i(t, "string") || i(t, "undefined") ? a(r, t) : (r = (e + " " + v.join(o + " ") + o).split(" "), l(r, t, n))
        }
        var c, u, f = {},
            d = t.documentElement,
            h = t.createElement("modernizr"),
            p = h.style,
            m = "Webkit Moz O ms",
            g = m.split(" "),
            v = m.toLowerCase().split(" "),
            w = {},
            y = [],
            $ = y.slice,
            C = {}.hasOwnProperty;
        u = i(C, "undefined") || i(C.call, "undefined") ? function(e, t) {
            return t in e && i(e.constructor.prototype[t], "undefined")
        } : function(e, t) {
            return C.call(e, t)
        }, Function.prototype.bind || (Function.prototype.bind = function(e) {
            var t = this;
            if ("function" != typeof t) throw new TypeError;
            var n = $.call(arguments, 1),
                o = function() {
                    if (this instanceof o) {
                        var i = function() {};
                        i.prototype = t.prototype;
                        var r = new i,
                            a = t.apply(r, n.concat($.call(arguments)));
                        return Object(a) === a ? a : r
                    }
                    return t.apply(e, n.concat($.call(arguments)))
                };
            return o
        }), w.cssanimations = function() {
            return s("animationName")
        };
        for (var b in w) u(w, b) && (c = b.toLowerCase(), f[c] = w[b](), y.push((f[c] ? "" : "no-") + c));
        return f.addTest = function(e, t) {
                if ("object" == typeof e)
                    for (var o in e) u(e, o) && f.addTest(o, e[o]);
                else {
                    if (e = e.toLowerCase(), f[e] !== n) return f;
                    t = "function" == typeof t ? t() : t, d.className += " " + (t ? "" : "no-") + e, f[e] = t
                }
                return f
            }, o(""), h = null,
            function(e, t) {
                function n(e, t) {
                    var n = e.createElement("p"),
                        o = e.getElementsByTagName("head")[0] || e.documentElement;
                    return n.innerHTML = "x<style>" + t + "</style>", o.insertBefore(n.lastChild, o.firstChild)
                }

                function o() {
                    var e = v.elements;
                    return "string" == typeof e ? e.split(" ") : e
                }

                function i(e) {
                    var t = g[e[p]];
                    return t || (t = {}, m++, e[p] = m, g[m] = t), t
                }

                function r(e, n, o) {
                    if (n || (n = t), u) return n.createElement(e);
                    o || (o = i(n));
                    var r;
                    return r = o.cache[e] ? o.cache[e].cloneNode() : h.test(e) ? (o.cache[e] = o.createElem(e)).cloneNode() : o.createElem(e), !r.canHaveChildren || d.test(e) || r.tagUrn ? r : o.frag.appendChild(r)
                }

                function a(e, n) {
                    if (e || (e = t), u) return e.createDocumentFragment();
                    n = n || i(e);
                    for (var r = n.frag.cloneNode(), a = 0, l = o(), s = l.length; a < s; a++) r.createElement(l[a]);
                    return r
                }

                function l(e, t) {
                    t.cache || (t.cache = {}, t.createElem = e.createElement, t.createFrag = e.createDocumentFragment, t.frag = t.createFrag()), e.createElement = function(n) {
                        return v.shivMethods ? r(n, e, t) : t.createElem(n)
                    }, e.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + o().join().replace(/[\w\-]+/g, function(e) {
                        return t.createElem(e), t.frag.createElement(e), 'c("' + e + '")'
                    }) + ");return n}")(v, t.frag)
                }

                function s(e) {
                    e || (e = t);
                    var o = i(e);
                    return v.shivCSS && !c && !o.hasCSS && (o.hasCSS = !!n(e, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), u || l(e, o), e
                }
                var c, u, f = e.html5 || {},
                    d = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                    h = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                    p = "_html5shiv",
                    m = 0,
                    g = {};
                ! function() {
                    try {
                        var e = t.createElement("a");
                        e.innerHTML = "<xyz></xyz>", c = "hidden" in e, u = 1 == e.childNodes.length || function() {
                            t.createElement("a");
                            var e = t.createDocumentFragment();
                            return void 0 === e.cloneNode || void 0 === e.createDocumentFragment || void 0 === e.createElement
                        }()
                    } catch (e) {
                        c = !0, u = !0
                    }
                }();
                var v = {
                    elements: f.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
                    version: "3.7.0",
                    shivCSS: !1 !== f.shivCSS,
                    supportsUnknownElements: u,
                    shivMethods: !1 !== f.shivMethods,
                    type: "default",
                    shivDocument: s,
                    createElement: r,
                    createDocumentFragment: a
                };
                e.html5 = v, s(t)
            }(this, t), f._version = "2.8.3", f._domPrefixes = v, f._cssomPrefixes = g, f.testProp = function(e) {
                return a([e])
            }, f.testAllProps = s, d.className = d.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + " js " + y.join(" "), f
    }(0, this.document),
    function(e, t, n) {
        function o(e) {
            return "[object Function]" == g.call(e)
        }

        function i(e) {
            return "string" == typeof e
        }

        function r() {}

        function a(e) {
            return !e || "loaded" == e || "complete" == e || "uninitialized" == e
        }

        function l() {
            var e = v.shift();
            w = 1, e ? e.t ? p(function() {
                ("c" == e.t ? d.injectCss : d.injectJs)(e.s, 0, e.a, e.x, e.e, 1)
            }, 0) : (e(), l()) : w = 0
        }

        function s(e, n, o, i, r, s, c) {
            function u(t) {
                if (!h && a(f.readyState) && (y.r = h = 1, !w && l(), f.onload = f.onreadystatechange = null, t)) {
                    "img" != e && p(function() {
                        C.removeChild(f)
                    }, 50);
                    for (var o in F[n]) F[n].hasOwnProperty(o) && F[n][o].onload()
                }
            }
            var c = c || d.errorTimeout,
                f = t.createElement(e),
                h = 0,
                g = 0,
                y = {
                    t: o,
                    s: n,
                    e: r,
                    a: s,
                    x: c
                };
            1 === F[n] && (g = 1, F[n] = []), "object" == e ? f.data = n : (f.src = n, f.type = e), f.width = f.height = "0", f.onerror = f.onload = f.onreadystatechange = function() {
                u.call(this, g)
            }, v.splice(i, 0, y), "img" != e && (g || 2 === F[n] ? (C.insertBefore(f, $ ? null : m), p(u, c)) : F[n].push(f))
        }

        function c(e, t, n, o, r) {
            return w = 0, t = t || "j", i(e) ? s("c" == t ? S : b, e, t, this.i++, n, o, r) : (v.splice(this.i++, 0, e), 1 == v.length && l()), this
        }

        function u() {
            var e = d;
            return e.loader = {
                load: c,
                i: 0
            }, e
        }
        var f, d, h = t.documentElement,
            p = e.setTimeout,
            m = t.getElementsByTagName("script")[0],
            g = {}.toString,
            v = [],
            w = 0,
            y = "MozAppearance" in h.style,
            $ = y && !!t.createRange().compareNode,
            C = $ ? h : m.parentNode,
            h = e.opera && "[object Opera]" == g.call(e.opera),
            h = !!t.attachEvent && !h,
            b = y ? "object" : h ? "script" : "img",
            S = h ? "script" : b,
            x = Array.isArray || function(e) {
                return "[object Array]" == g.call(e)
            },
            k = [],
            F = {},
            O = {
                timeout: function(e, t) {
                    return t.length && (e.timeout = t[0]), e
                }
            };
        d = function(e) {
            function t(e) {
                var t, n, o, e = e.split("!"),
                    i = k.length,
                    r = e.pop(),
                    a = e.length,
                    r = {
                        url: r,
                        origUrl: r,
                        prefixes: e
                    };
                for (n = 0; n < a; n++) o = e[n].split("="), (t = O[o.shift()]) && (r = t(r, o));
                for (n = 0; n < i; n++) r = k[n](r);
                return r
            }

            function a(e, i, r, a, l) {
                var s = t(e),
                    c = s.autoCallback;
                s.url.split(".").pop().split("?").shift(), s.bypass || (i && (i = o(i) ? i : i[e] || i[a] || i[e.split("/").pop().split("?")[0]]), s.instead ? s.instead(e, i, r, a, l) : (F[s.url] ? s.noexec = !0 : F[s.url] = 1, r.load(s.url, s.forceCSS || !s.forceJS && "css" == s.url.split(".").pop().split("?").shift() ? "c" : n, s.noexec, s.attrs, s.timeout), (o(i) || o(c)) && r.load(function() {
                    u(), i && i(s.origUrl, l, a), c && c(s.origUrl, l, a), F[s.url] = 2
                })))
            }

            function l(e, t) {
                function n(e, n) {
                    if (e) {
                        if (i(e)) n || (f = function() {
                            var e = [].slice.call(arguments);
                            d.apply(this, e), h()
                        }), a(e, f, t, 0, c);
                        else if (Object(e) === e)
                            for (s in l = function() {
                                    var t, n = 0;
                                    for (t in e) e.hasOwnProperty(t) && n++;
                                    return n
                                }(), e) e.hasOwnProperty(s) && (!n && !--l && (o(f) ? f = function() {
                                var e = [].slice.call(arguments);
                                d.apply(this, e), h()
                            } : f[s] = function(e) {
                                return function() {
                                    var t = [].slice.call(arguments);
                                    e && e.apply(this, t), h()
                                }
                            }(d[s])), a(e[s], f, t, s, c))
                    } else !n && h()
                }
                var l, s, c = !!e.test,
                    u = e.load || e.both,
                    f = e.callback || r,
                    d = f,
                    h = e.complete || r;
                n(c ? e.yep : e.nope, !!u), u && n(u)
            }
            var s, c, f = this.yepnope.loader;
            if (i(e)) a(e, 0, f, 0);
            else if (x(e))
                for (s = 0; s < e.length; s++) c = e[s], i(c) ? a(c, 0, f, 0) : x(c) ? d(c) : Object(c) === c && l(c, f);
            else Object(e) === e && l(e, f)
        }, d.addPrefix = function(e, t) {
            O[e] = t
        }, d.addFilter = function(e) {
            k.push(e)
        }, d.errorTimeout = 1e4, null == t.readyState && t.addEventListener && (t.readyState = "loading", t.addEventListener("DOMContentLoaded", f = function() {
            t.removeEventListener("DOMContentLoaded", f, 0), t.readyState = "complete"
        }, 0)), e.yepnope = u(), e.yepnope.executeStack = l, e.yepnope.injectJs = function(e, n, o, i, s, c) {
            var u, f, h = t.createElement("script"),
                i = i || d.errorTimeout;
            h.src = e;
            for (f in o) h.setAttribute(f, o[f]);
            n = c ? l : n || r, h.onreadystatechange = h.onload = function() {
                !u && a(h.readyState) && (u = 1, n(), h.onload = h.onreadystatechange = null)
            }, p(function() {
                u || (u = 1, n(1))
            }, i), s ? h.onload() : m.parentNode.insertBefore(h, m)
        }, e.yepnope.injectCss = function(e, n, o, i, a, s) {
            var c, i = t.createElement("link"),
                n = s ? l : n || r;
            i.href = e, i.rel = "stylesheet", i.type = "text/css";
            for (c in o) i.setAttribute(c, o[c]);
            a || (m.parentNode.insertBefore(i, m), p(n, 0))
        }
    }(this, document), Modernizr.load = function() {
        yepnope.apply(window, [].slice.call(arguments, 0))
    }, window.svgeezy = function() {
        return {
            init: function(e, t) {
                this.avoid = e || !1, this.filetype = t || "png", this.svgSupport = this.supportsSvg(), this.svgSupport || (this.images = document.getElementsByTagName("img"), this.imgL = this.images.length, this.fallbacks())
            },
            fallbacks: function() {
                for (; this.imgL--;)
                    if (!this.hasClass(this.images[this.imgL], this.avoid) || !this.avoid) {
                        var e = this.images[this.imgL].getAttribute("src");
                        if (null === e) continue;
                        if ("svg" == this.getFileExt(e)) {
                            var t = e.replace(".svg", "." + this.filetype);
                            this.images[this.imgL].setAttribute("src", t)
                        }
                    }
            },
            getFileExt: function(e) {
                var t = e.split(".").pop();
                return -1 !== t.indexOf("?") && (t = t.split("?")[0]), t
            },
            hasClass: function(e, t) {
                return (" " + e.className + " ").indexOf(" " + t + " ") > -1
            },
            supportsSvg: function() {
                return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")
            }
        }
    }();
var namespace, __slice = [].slice;
(namespace = function(e, t, n) {
    var o, i, r, a, l, s;
    for (l = arguments.length < 3 ? ["undefined" != typeof exports ? exports : window].concat(__slice.call(arguments)) : void 0, e = l[0], t = l[1], n = l[2], i = e, s = t.split("."), r = 0, a = s.length; r < a; r++) o = s[r], e = e[o] || (e[o] = {});
    return n(e, i)
})("AO.Main", function(e) {
    e.navSwap = function(e) {
        $(window).on("load resize", function() {
            togglePoint = null == e ? 1.5 * $("#top-nav").height() : $(e).offset().top
        });
        var t = $("#fixed-nav");
        $(window).on("load scroll resize", function() {
            $(document).scrollTop() >= togglePoint ? t.show().addClass("fadeInDown").removeClass("fadeOutUp") : t.hasClass("fadeInDown") && t.addClass("fadeOutUp").removeClass("fadeInDown").hide()
        })
    }, e.homepageScrollAnimations = function() {
        $(document).ready(function() {
            var e = function() {
                    return $(window).width() > 960
                },
                t = !1,
                n = $(window).height(),
                o = $(document).scrollTop(),
                i = $("#home-our-work").offset().top;
            e() && o <= i - n && (t = !0), t && ($("#home-our-work #photos-1-1").safeFade(), $("#home-our-work #photos-1-2").safeFade(), $("#home-our-work .paragraph1").safeFade(), $("#home-our-work .button").safeFade(), $(".clients-intro").safeFade(), $(".clients").safeFade(), $("#home-technical-skillset .paragraph").safeFade(), $(".tech-skillset-diagram").safeFade(), $(".location").safeFade(), $("#cost-value-graph dt").removeClass("default"), $("#budget .paragraph-right").safeFade(), $("#budget-photo-1").safeFade(), $("#budget-photo-2").safeFade()), $(window).resize(function() {
                t && !e() && (t = !1, $("#home-our-work #photos-1-1").safeFadeIn(), $("#home-our-work #photos-1-2").safeFadeIn(), $("#home-our-work .paragraph1").safeFadeIn(), $("#home-our-work .button").safeFadeIn(), $(".clients-intro").safeFadeIn(), $(".clients").safeFadeIn(), $("#home-technical-skillset .paragraph").safeFadeIn(), $(".tech-skillset-diagram").safeFadeIn(), $(".location").safeFadeIn(), $("#cost-value-graph dt").addClass("default"), $("#budget .paragraph-right").safeFadeIn(), $("#budget-photo-1").safeFadeIn(), $("#budget-photo-2").safeFadeIn())
            }), $("#home-our-work").waypoint(function() {
                t && ($("#home-our-work #photos-1-1").show().addClass("fadeInLeft"), $("#home-our-work #photos-1-2").show().addClass("fadeInUp"), $(".paragraph1").show().addClass("fadeInRight"), $("#home-our-work .button").show().addClass("fadeInRight"))
            }, {
                offset: "70%"
            }), $("#home-our-clients").waypoint(function() {
                t && $(".clients-intro").show().addClass("fadeInUpBig")
            }, {
                offset: "65%"
            }), $("#home-our-clients").waypoint(function() {
                t && $(".clients").show().addClass("fadeInUpBig")
            }, {
                offset: "60%"
            }), $("#home-technical-skillset").waypoint(function() {
                t && ($("#home-technical-skillset .paragraph").show().addClass("fadeInRight"), $(".tech-skillset-diagram").show().addClass("fadeInLeft"))
            }, {
                offset: "70%"
            }), $("#cost-value-graph").waypoint(function() {
                t && $("#cost-value-graph dt").addClass("animated")
            }, {
                offset: "65%"
            }), $("#budget").waypoint(function() {
                t && ($("#budget .paragraph-right").show().addClass("fadeInRight"), $("#budget-photo-1").show().addClass("fadeInLeft"), $("#budget-photo-2").show().addClass("fadeInUp"))
            }, {
                offset: "60%"
            })
        })
    }, e.ieCompatAnimations = function() {
        var e = function(e, t, n) {
            Modernizr.cssanimations ? t(e) : n(e)
        };
        $.fn.extend({
            safeFade: function() {
                e(this, function(e) {
                    e.addClass("fade")
                }, function(e) {
                    e.hide()
                })
            },
            safeFadeIn: function() {
                e(this, function(e) {
                    e.removeClass("fadeOutUp").addClass("animated").addClass("fadeInDown")
                }, function(e) {
                    e.show()
                })
            },
            safeFadeOut: function() {
                e(this, function(e) {
                    e.addClass("fadeOutUp").addClass("animated").removeClass("fadeInDown")
                }, function(e) {
                    e.hide()
                })
            }
        })
    }, e.svgFallbacks = function() {
        svgeezy.init(!1, "png")
    }, e.toggleOpen = function() {
        $("[data-toggle]").on("click", function(e) {
            e.preventDefault();
            var t = $(this),
                n = t.data("toggle"),
                o = $(n),
                i = $("[data-toggle=" + n + "]");
            o.hasClass("open") ? (o.removeClass("open"), i.removeClass("triggered")) : (o.addClass("open"), i.addClass("triggered"))
        })
    }, e.touchSupport = function() {
        var e;
        ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch) && (e = !0), $("html").addClass(e ? "touch" : "no-touch")
    }, e.mobileNavFix = function() {
        $("#mobile-nav-trigger").click(function() {
            $("body").addClass("noscroll")
        }), $("#icon-mobile-close").click(function() {
            $("body").removeClass("noscroll")
        })
    }, e.cultureCollageAnimations = function() {
        $(document).ready(function() {
            var e = function() {
                    return $(window).width() > 960
                },
                t = !1,
                n = $(window).height(),
                o = $(document).scrollTop(),
                i = $(".culture-photo-collage").offset().top;
            e() && o <= i - n && (t = !0), t && $(".culture-photo-collage img").addClass("fade"), $(window).resize(function() {
                t && !e() && (t = !1, $(".culture-photo-collage img").removeClass("fade"))
            }), $(".culture-photo-collage").waypoint(function() {
                t && $("#collage-01, #collage-02, #collage-03").removeClass("fade").addClass("animate")
            }, {
                offset: "85%"
            }), $(".culture-photo-collage").waypoint(function() {
                t && $("#collage-04, #collage-05, #collage-06, #collage-07").removeClass("fade").addClass("animate")
            }, {
                offset: "72.5%"
            }), $(".culture-photo-collage").waypoint(function() {
                t && $("#collage-08, #collage-09, #collage-10, #collage-11").removeClass("fade").addClass("animate")
            }, {
                offset: "60%"
            }), $(".culture-photo-collage").waypoint(function() {
                t && $("#collage-12, #collage-13, #collage-14, #collage-15").removeClass("fade").addClass("animate")
            }, {
                offset: "47.5%"
            }), $(".culture-photo-collage").waypoint(function() {
                t && $("#collage-16, #collage-17, #collage-18, #collage-19").removeClass("fade").addClass("animate")
            }, {
                offset: "35%"
            })
        })
    }, e.teamAnimations = function() {
        $(document).ready(function() {
            var e = function() {
                    return $(window).width() > 960
                },
                t = !1,
                n = $(window).height(),
                o = $(document).scrollTop(),
                i = $(".carl-letter-section .carl-letter").offset().top;
            e() && o <= i - n && (t = !0), t && $(".carl-letter-section .carl-letter img, .carl-letter, .carl-envelope").addClass("fade"), $(window).resize(function() {
                t && !e() && (t = !1, $(".carl-letter-section .carl-letter img, .carl-letter, .carl-envelope").removeClass("fade"))
            }), $(".carl-letter-section").waypoint(function() {
                t && $(".carl-letter-section .carl-letter img").removeClass("fade").addClass("animate")
            }, {
                offset: "70%"
            }), $(".carl-letter-section").waypoint(function() {
                t && ($(".carl-letter").removeClass("fade").addClass("animate"), $(".carl-envelope").removeClass("fade").addClass("animate"))
            }, {
                offset: "65%"
            })
        })
    }, e.acceleratorAnimations = function() {
        $(document).ready(function() {
            $(".slide").first().addClass("active"), $("#prev").click(function() {
                $(".active").removeClass("active").addClass("oldActive"), $(".oldActive").is(":last-child") ? $(".slide").first().addClass("active") : $(".oldActive").next().addClass("active"), $(".oldActive").removeClass("oldActive"), $(".slide").fadeOut(500), $(".active").fadeIn(500)
            }), $("#next").click(function() {
                $(".active").removeClass("active").addClass("oldActive"), $(".oldActive").is(":first-child") ? $(".slide").last().addClass("active") : $(".oldActive").prev().addClass("active"), $(".oldActive").removeClass("oldActive"), $(".slide").fadeOut(500), $(".active").fadeIn(500)
            })
        })
    }, (e.init = function() {
        $("html").removeClass("no-js"), AO.Main.navSwap(), AO.Main.ieCompatAnimations(), AO.Main.svgFallbacks(), AO.Main.toggleOpen(), AO.Main.touchSupport(), AO.Main.mobileNavFix()
    })()
});