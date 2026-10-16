import { useId } from 'react';

// Original vector silhouettes used for the heritage scenes. They are illustrations,
// not photographs. Colour comes from CSS (`color`), so each scene can tint them.

const svgProps = {
  'aria-hidden': 'true',
  focusable: 'false',
  preserveAspectRatio: 'xMidYMax meet',
};

// South Indian temple gateway tower (gopuram)
export function Gopuram(props) {
  return (
    <svg viewBox="0 0 220 300" {...svgProps} {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M20 300V270H200V300Z
           M38 270L182 270L172 236L48 236Z
           M54 236L166 236L158 206L62 206Z
           M68 206L152 206L145 180L75 180Z
           M80 180L140 180L134 158L86 158Z
           M91 158L129 158L125 140L95 140Z
           M100 140L120 140L117 126L103 126Z
           M97 126Q110 98 123 126Z
           M108 100H112V84H108Z
           M105 78a5 5 0 1 0 10 0a5 5 0 1 0 -10 0Z
           M48 236L52 222L56 236Z M164 236L168 222L172 236Z
           M100 270V250Q110 238 120 250V270Z
           M62 248H72V262H62Z M148 248H158V262H148Z
           M80 214H88V226H80Z M106 214H114V226H106Z M132 214H140V226H132Z
           M90 188H96V200H90Z M107 188H113V200H107Z M124 188H130V200H124Z"
      />
    </svg>
  );
}

// Coconut palm
export function Palm(props) {
  return (
    <svg viewBox="0 0 180 280" {...svgProps} {...props}>
      <g fill="currentColor">
        <path d="M82 280C86 210 76 160 92 96L100 98C88 160 98 215 96 280Z" />
        <path d="M96 96C70 60 30 56 4 84C36 70 68 78 96 96Z" />
        <path d="M96 96C70 78 40 86 14 120C46 100 72 100 96 96Z" />
        <path d="M96 96C126 60 166 58 178 90C148 72 122 78 96 96Z" />
        <path d="M96 96C122 82 150 92 170 126C142 104 118 102 96 96Z" />
        <path d="M96 96C84 60 86 30 104 4C104 36 102 66 96 96Z" />
        <path d="M96 96C96 64 74 40 50 30C70 50 84 70 96 96Z" />
        <path d="M96 96C100 64 124 40 150 30C128 50 110 70 96 96Z" />
        <circle cx="90" cy="101" r="6" />
        <circle cx="102" cy="103" r="6" />
      </g>
    </svg>
  );
}

// Banana leaves
export function BananaLeaf(props) {
  return (
    <svg viewBox="0 0 220 280" {...svgProps} {...props}>
      <g fill="currentColor">
        <path d="M18 280C6 170 56 60 200 12C206 70 168 200 46 280Z" />
        <path d="M60 280C60 200 110 130 170 112C170 170 130 240 90 280Z" />
      </g>
      <path
        d="M34 270C80 170 130 90 196 22"
        stroke="rgba(255,255,255,0.09)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function merlons(x1, x2, y) {
  let d = '';
  for (let x = x1; x + 8 <= x2; x += 16) d += `M${x} ${y - 8}h8v8h-8Z`;
  return d;
}

// Maharashtrian hill fort with a saffron flag (the flag colour is set in CSS: .art__flag)
export function Fort(props) {
  const maskId = `fort-${useId().replace(/:/g, '')}`;
  return (
    <svg viewBox="0 0 520 260" {...svgProps} {...props}>
      <defs>
        <mask id={maskId}>
          <rect width="520" height="260" fill="#fff" />
          <path
            fill="#000"
            d="M226 210V186A14 14 0 0 1 254 186V210Z
               M58 140h6v20h-6Z M372 118h8v24h-8Z M392 150h6v18h-6Z M474 150h6v20h-6Z
               M214 168h6v10h-6Z M260 168h6v10h-6Z M360 168h6v18h-6Z"
          />
        </mask>
      </defs>
      <g fill="currentColor" mask={`url(#${maskId})`}>
        <path d="M0 260V212C60 200 130 222 210 206S350 190 430 208S500 200 520 206V260Z" />
        <path d="M20 230V190H500V230Z" />
        <path d={merlons(24, 496, 190)} />
        <path d="M34 200V124H90V200Z" />
        <path d={merlons(34, 90, 124)} />
        <path d="M200 210V152H280V210Z" />
        <path d={merlons(200, 280, 152)} />
        <path d="M148 192V162L160 144L172 162V192Z" />
        <path d="M340 205V96H420V205Z" />
        <path d={merlons(340, 420, 96)} />
        <path d="M452 205V132H502V205Z" />
        <path d={merlons(452, 502, 132)} />
        <path d="M378 96V34H382V96Z" />
        <circle cx="380" cy="32" r="3.5" />
      </g>
      <path className="art__flag" d="M382 38L432 52L382 66Z" />
    </svg>
  );
}
