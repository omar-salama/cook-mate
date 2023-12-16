import { Combobox, InputBase, useCombobox } from '@mantine/core';

const getOptionLabel = (value: string): string => {
  switch (value) {
    case 'createdAt':
      return 'Newest';
    case 'rating':
      return 'Highest Rated';
    default:
      // Explicitly throw an error for non-exhaustive cases
      throw new Error(`Unhandled value: ${value}`);
  }
};
const ComboboxComponent = ({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (string: string) => void;
}) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        combobox.closeDropdown();
        onChange(val);
      }}
    >
      <Combobox.Target>
        <InputBase
          component='button'
          type='button'
          pointer
          radius='md'
          size='md'
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents='none'
          onClick={() => combobox.toggleDropdown()}
        >
          {getOptionLabel(value)}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options.map((option) => (
            <Combobox.Option value={option} key={option}>
              {getOptionLabel(option)}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default ComboboxComponent;
