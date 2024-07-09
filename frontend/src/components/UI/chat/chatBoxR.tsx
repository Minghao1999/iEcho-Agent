import { memo, SVGProps } from 'react';

const Group24Icon = (props: SVGProps<SVGSVGElement>) => (
    <svg preserveAspectRatio='none' viewBox='0 0 327 83' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
        <path
            d='M312.747 15C312.747 6.71573 306.032 0 297.747 0H15C6.71574 0 8.9407e-07 6.71573 8.9407e-07 15V68C8.9407e-07 76.2843 6.71573 83 15 83H315.609C319.884 83 322.187 77.9828 319.401 74.7408L316.372 71.217C314.033 68.4961 312.747 65.0271 312.747 61.4393V15Z'
            fill='#09A4E3'
            fillOpacity={0.41}
        />
    </svg>
);

const Memo = memo(Group24Icon);
export { Memo as Group24Icon };
