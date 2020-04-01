"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mermaid_1 = require("mermaid");
var MermaidChart = function (code) {
    try {
        var needsUniqueId = "render" + Math.floor(Math.random() * 10000).toString();
        mermaid_1.default.mermaidAPI.render(needsUniqueId, code, function (sc) {
            code = sc;
        });
        return "<div class=\"mermaid\">" + code + "</div>";
    }
    catch (_a) {
        var str = _a.str, hash = _a.hash;
        return "<pre>" + str + "</pre>";
    }
};
var MermaidPlugIn = function (md, opts) {
    mermaid_1.default.initialize(Object.assign(MermaidPlugIn.default, opts));
    var defaultRenderer = md.renderer.rules.fence.bind(md.renderer.rules);
    md.renderer.rules.fence = function (tokens, idx, opts, env, self) {
        var token = tokens[idx];
        var code = token.info + " \n " + token.content.trim();
        if (token.info === "mermaid" ||
            token.info === "gantt" ||
            token.info === "sequenceDiagram" ||
            token.info === "classDiagram" ||
            token.info === "gitGraph" ||
            token.info.match(/^graph (?:TB|BT|RL|LR|TD);?$/)) {
            return MermaidChart(code);
        }
        return defaultRenderer(tokens, idx, opts, env, self);
    };
};
MermaidPlugIn.default = {
    startOnLoad: false,
    securityLevel: "true",
    theme: "default",
    flowchart: {
        htmlLabels: false,
        useMaxWidth: true
    }
};
exports.default = MermaidPlugIn;
//# sourceMappingURL=index.js.map