import { memo, SVGProps } from 'react';

const Ellipse8Icon = (props: SVGProps<SVGSVGElement>) => (
    <svg preserveAspectRatio='none' viewBox='0 0 1240 1240' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
        <circle cx={620} cy={620} r={620} fill='#20789D' />
    </svg>
);

const Memo = memo(Ellipse8Icon);
export { Memo as Ellipse8Icon };
