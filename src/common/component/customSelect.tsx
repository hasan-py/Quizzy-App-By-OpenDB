import { InputGroup, InputLeftAddon, Select } from "@chakra-ui/react";

interface CustomSelectInterface {
  options: Array<any>;
  name: string;
  label: string;
  onChange: Function;
  value: any;
}

function CustomSelect({
  options,
  name,
  label,
  onChange,
  value,
}: CustomSelectInterface) {
  return (
    <InputGroup mb={4}>
      <InputLeftAddon children={label} />

      <Select onChange={(e: any) => onChange(e)} name={name} value={value}>
        {options?.map((option, key) => (
          <option key={key} value={option?.id}>
            {option?.name}
          </option>
        ))}
      </Select>
    </InputGroup>
  );
}

export default CustomSelect;
