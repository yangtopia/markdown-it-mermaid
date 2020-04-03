import MarkdownIt from "markdown-it";
import mermaid from "mermaid";
import mermaidAPI from "mermaid/mermaidAPI";

const MermaidChart = (code: string) => {
  try {
    const needsUniqueId =
      "render" + Math.floor(Math.random() * 10000).toString();
    mermaid.mermaidAPI.render(needsUniqueId, code, sc => {
      code = sc;
    });
    return `<div class="mermaid">${code}</div>`;
  } catch (error) {
    throw error;
    // return `<pre>${str}</pre>`;
  }
};

const MermaidPlugIn = (md: MarkdownIt, opts: mermaidAPI.Config) => {
  mermaid.initialize(Object.assign(MermaidPlugIn.default, opts));

  const defaultRenderer = md.renderer.rules.fence.bind(md.renderer.rules);

  md.renderer.rules.fence = (tokens, idx, opts, env, self) => {
    const token = tokens[idx];
    const code = `${token.info} \n ${token.content.trim()}`;
    if (
      token.info === "mermaid" ||
      token.info === "gantt" ||
      token.info === "sequenceDiagram" ||
      token.info === "classDiagram" ||
      token.info === "gitGraph" ||
      token.info.match(/^graph (?:TB|BT|RL|LR|TD);?$/)
    ) {
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

export default MermaidPlugIn;
