import MarkdownIt from "markdown-it";
import mermaidAPI from "mermaid/mermaidAPI";
declare const MermaidPlugIn: {
    (md: MarkdownIt, opts: mermaidAPI.Config): void;
    default: {
        startOnLoad: boolean;
        securityLevel: string;
        theme: string;
        flowchart: {
            htmlLabels: boolean;
            useMaxWidth: boolean;
        };
    };
};
export default MermaidPlugIn;
