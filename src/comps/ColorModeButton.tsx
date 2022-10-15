import { useState } from '@app/context';

const ColorModeButton = () => {
  const { actions: { toggleColorMode } } = useState();
  return (
    <button
      onClick={toggleColorMode}
      class="p-2 rounded-1 color-orange dark:color-lightblue"
    >
      <div class="i-ion-ios-sunny dark:i-ion-ios-moon text-2xl" />
    </button>
  );
};

export default ColorModeButton;
