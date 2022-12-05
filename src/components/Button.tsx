import { useStateContext } from '../contexts/ContextProvider';
import { IButton } from 'models/ComponentModels';

export const Button = ({ icon, bgColor, color, bgHoverColor, size, text, borderRadius, width }: IButton) => {
  const { setIsClicked, initialState } = useStateContext();

  return (
    <button
      type="submit"
      onClick={() => setIsClicked(initialState)}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
};

