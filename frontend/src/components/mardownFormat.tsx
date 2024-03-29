import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface PropType {
    content: string;
}

export const MarkdownRenderer = ({ content }: PropType) => {
    // Replace '•' with '  *' and add indentation for album list
    const modifiedContent = content
        .replace(/•/g, '  •')
        .split('\n')
        .map((line, index) => {
            // Add indentation for lines containing album names
            if (index > 0 && /^\S/.test(line)) {
                return '    ' + line;
            }
            return line;
        })
        .join('\n');

    return (
        <ReactMarkdown
            children={modifiedContent}
            remarkPlugins={[remarkGfm]}
        />
    );
};
