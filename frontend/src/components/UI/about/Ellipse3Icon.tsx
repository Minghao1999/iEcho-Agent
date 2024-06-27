import { memo, SVGProps } from 'react';

const Ellipse3Icon = (props: SVGProps<SVGSVGElement>) => (
    <svg preserveAspectRatio='none' viewBox='0 0 473 473' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
        <circle cx={236.5} cy={236.5} r={236.5} fill='#09A4E3' />
    </svg>
);

const Memo = memo(Ellipse3Icon);
export { Memo as Ellipse3Icon };
