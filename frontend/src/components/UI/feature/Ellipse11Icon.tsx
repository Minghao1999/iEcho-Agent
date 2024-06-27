import { memo, SVGProps } from 'react';

const Ellipse11Icon = (props: SVGProps<SVGSVGElement>) => (
    <svg preserveAspectRatio='none' viewBox='0 0 541 541' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
        <path
            d='M541 270.5C541 198.759 512.501 129.956 461.772 79.2276C411.044 28.499 342.241 5.4163e-06 270.5 0C198.759 -5.4163e-06 129.956 28.499 79.2276 79.2276C28.499 129.956 1.08326e-05 198.759 0 270.5L270.5 270.5H541Z'
            fill='#9BC8DC'
        />
    </svg>
);

const Memo = memo(Ellipse11Icon);
export { Memo as Ellipse11Icon };
