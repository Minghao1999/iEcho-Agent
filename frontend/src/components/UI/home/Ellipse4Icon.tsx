import { memo, SVGProps } from 'react';

const Ellipse4Icon = (props: SVGProps<SVGSVGElement>) => (
    <svg preserveAspectRatio='none' viewBox='0 0 337 337' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
        <circle cx={168.5} cy={168.5} r={168.5} fill='#9BC8DC' />
    </svg>
);

const Memo = memo(Ellipse4Icon);
export { Memo as Ellipse4Icon };
