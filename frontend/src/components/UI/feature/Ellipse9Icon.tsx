import { memo, SVGProps } from 'react';

const Ellipse9Icon = (props: SVGProps<SVGSVGElement>) => (
    <svg preserveAspectRatio='none' viewBox='0 0 486 486' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
        <circle cx={243} cy={243} r={243} fill='#9BC8DC' />
    </svg>
);

const Memo = memo(Ellipse9Icon);
export { Memo as Ellipse9Icon };
