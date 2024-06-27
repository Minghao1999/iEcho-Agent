import { memo, SVGProps } from 'react';

const Ellipse6Icon = (props: SVGProps<SVGSVGElement>) => (
    <svg preserveAspectRatio='none' viewBox='0 0 726 726' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
        <circle cx={363} cy={363} r={363} fill='#9BC8DC' />
    </svg>
);

const Memo = memo(Ellipse6Icon);
export { Memo as Ellipse6Icon };
