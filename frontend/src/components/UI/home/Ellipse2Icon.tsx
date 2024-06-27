import { memo, SVGProps } from 'react';

const Ellipse2Icon = (props: SVGProps<SVGSVGElement>) => (
    <svg preserveAspectRatio='none' viewBox='0 0 427 427' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
        <circle cx={213.5} cy={213.5} r={213.5} fill='#2C6077' />
    </svg>
);

const Memo = memo(Ellipse2Icon);
export { Memo as Ellipse2Icon };
