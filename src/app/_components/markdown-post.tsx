import { useMDXComponent } from "next-contentlayer/hooks";
import { MDXComponents } from "mdx/types";
import clsx from "clsx";

const components: MDXComponents = {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => <h1 className="my-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl [&:not(:first-child)]:mt-8">{children}</h1>,
    h2: ({ children }) => <h2 className="my-4 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 [&:not(:first-child)]:mt-8">{children}</h2>,
    h3: ({ children }) => <h3 className="my-4 scroll-m-20 text-2xl font-semibold tracking-tight [&:not(:first-child)]:mt-8">{children}</h3>,
    h4: ({ children }) => <h4 className="my-4 scroll-m-20 text-xl font-semibold tracking-tight [&:not(:first-child)]:mt-4">{children}</h4>,
    p: ({ children }) => <p className="leading-7 text-lg [&:not(:first-child)]:mt-6">{children}</p>,
    blockquote: ({ children }) => <blockquote className="mt-6 bg-slate-50 py-2 border-l-2 pl-6 italic">{children}</blockquote>,
    ul: ({ children }) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>,
    li: ({ children }) => <li className="leading-7 list-outside list-decimal">{children}</li>,
    pre: ({ className, children, ...props }) => {
        return (
            <pre className={clsx("p-0 my-4 px-4 py-4 bg-transparent rounded overflow-x-auto", className)} {...props}>
                {children}
            </pre>
        )
    },
    code: ({children}) => <code className="relative my-4 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">{children}</code>,
    lead: ({ children }) => <p className="text-xl text-muted-foreground">{children}</p>,
    a: ({ children, href }) => (
        <a href={href} className="text-red-500 underline decoration-red-400 underline-offset-4 hover:text-red-700 hover:decoration-red-700 hover:decoration-2">{children}</a>
    ),
    table: ({children}) => <table className="table-auto my-2 w-full text-sm text-right rtl:text-left text-gray-500 dark:text-gray-400">{children}</table>,
    tbody: ({children}) => <tbody className="bg-slate-100 dark:bg-white-700 text-gray-700 dark:text-gray-400">{children}</tbody>,
    thead: ({children}) => <thead className="text-gray-700 uppercase bg-sky-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-b-gray-500">{children}</thead>,
    th: ({children}) => <th className="px-4 py-3">{children}</th>,
    td: ({children}) => <td className="px-4 py-4">{children}</td>,
    tr: ({children}) => <tr className="divide-y [&:not(:last-child)]:border-b-2 border-b-slate-200">{children}</tr>
};

interface MarkdownPostProps {
    code: string
}

export function MarkdownPost({ code }: MarkdownPostProps) {
    const Component = useMDXComponent(code);

    return (
        <article className="mdx sm:mx-4">
            <Component components={components} />
        </article>
    )
}