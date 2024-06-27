import { memo, SVGProps } from 'react';

const Ellipse5Icon = (props: SVGProps<SVGSVGElement>) => (
    <svg preserveAspectRatio='none' viewBox='0 0 305 305' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
        <circle cx={152.5} cy={152.5} r={152.5} fill='#0E89BC' />
    </svg>
);

const Memo = memo(Ellipse5Icon);
export { Memo as Ellipse5Icon };
