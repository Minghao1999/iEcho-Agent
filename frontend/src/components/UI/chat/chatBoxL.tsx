import { memo, SVGProps } from 'react';

const ChatBoxL = (props: SVGProps<SVGSVGElement>) => (
    <svg preserveAspectRatio='none' viewBox='0 0 321 83' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
        <path
            d='M13.5 15C13.5 6.71573 20.2157 0 28.5 0H305.5C313.784 0 320.5 6.71573 320.5 15V68C320.5 76.2843 313.784 83 305.5 83H10.7607C6.50723 83 4.19633 78.0266 6.9393 74.7756L9.96438 71.1904C12.2476 68.4843 13.5 65.0579 13.5 61.5173V15Z'
            fill='#D9D9D9'
            fillOpacity={0.64}
        />
    </svg>
);

const Memo = memo(ChatBoxL);
export { Memo as Rectangle37Icon };
