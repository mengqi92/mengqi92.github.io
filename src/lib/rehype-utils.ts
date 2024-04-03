import { visit } from 'unist-util-visit'

export const preProcess = () => (tree) => {
    visit(tree, (node) => {
        if (node?.type === 'element' && node?.tagName === 'pre') {
            const [codeEl] = node.children

            if (codeEl.tagName !== 'code') return

            node.raw = codeEl.children?.[0].value
            // console.info('node preProcessed: ', node);
        }
    })
}

export const postProcess = () => (tree) => {
    visit(tree, (node) => {
        if (node?.type === 'element' && node?.tagName === 'figure') {
            if (!("data-rehype-pretty-code-figure" in node.properties)) {
                return;
            }

            for (const child of node.children) {
                if (child.tagName === "pre") {
                    child.properties["raw"] = node.raw;
                }
            }
            node.properties['raw'] = node.raw
            console.log('PostProcessed: ', node); // here to see if you're getting the raw text
        }
    })
}
