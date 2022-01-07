// https://tailwind-elements.com/docs/standard/components/alerts/

import Info from './icons/Info';
import Check from './icons/Check';
import Ex from './icons/Ex';
import Secondary from './icons/Secondary';

const MAPPING = {
  info: ['blue', <Info />],
  success: ['green', <Check />],
  danger: ['red', <Ex />],
  secondary: ['purple', <Secondary />],
};

function Alert({ type, children }) {
  // TODO: 매핑 오류에 대한 대응
  const [colorCode, icon] = MAPPING[type];
  const className = `bg-${colorCode}-100 rounded-lg py-5 px-6 mb-3 text-base text-${colorCode}-700 inline-flex items-center w-full role="alert"`;

  return (
    <div className={className}>
      <span className="mr-2">{icon}</span>
      {children}
    </div>
  );
}

export default Alert;
