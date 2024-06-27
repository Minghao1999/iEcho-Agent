import { memo, SVGProps } from 'react';

const Ellipse5Icon = (props: SVGProps<SVGSVGElement>) => (
    <svg preserveAspectRatio='none' viewBox='0 0 422 432' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
        <ellipse cx={211} cy={216} rx={211} ry={216} fill='#336A81' />
    </svg>
);

const Memo = memo(Ellipse5Icon);
export { Memo as Ellipse5Icon };
