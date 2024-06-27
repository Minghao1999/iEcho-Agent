import { memo, SVGProps } from 'react';

const Ellipse10Icon = (props: SVGProps<SVGSVGElement>) => (
    <svg preserveAspectRatio='none' viewBox='0 0 720 643' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
        <path
            d='M539.294 302.5C539.294 469.566 1003.29 742.5 443.294 605C-327.206 636 140.794 469.566 140.794 302.5C-72.7058 0 276.228 0 443.294 0C756.794 302.5 539.294 135.434 539.294 302.5Z'
            fill='#20789D'
        />
    </svg>
);

const Memo = memo(Ellipse10Icon);
export { Memo as Ellipse10Icon };
