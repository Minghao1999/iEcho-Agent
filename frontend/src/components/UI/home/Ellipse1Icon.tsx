import { memo, SVGProps } from 'react';

const Ellipse1Icon = (props: SVGProps<SVGSVGElement>) => (
    <svg preserveAspectRatio='none' viewBox='0 0 235 235' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
        <circle cx={117.5} cy={117.5} r={117.5} fill='#D9D9D9' />
    </svg>
);

const Memo = memo(Ellipse1Icon);
export { Memo as Ellipse1Icon };
