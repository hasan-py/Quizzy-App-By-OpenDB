import { InputGroup, InputLeftAddon, Input } from "@chakra-ui/react";

interface CustomInputInterface {
  name: string;
  label: string;
  type?: string;
  onChange: Function;
  value: string | number | undefined;
  onKeyDown?: Function;
}

function CustomInput({
  type,
  name,
  label,
  onChange,
  value,
  onKeyDown,
}: CustomInputInterface) {
  return (
    <InputGroup mb={4}>
      <InputLeftAddon children={label} />
      <Input
        value={value}
        onChange={(e: any) => onChange(e)}
        onKeyDown={(e: any) => onKeyDown && onKeyDown(e)}
        name={name}
        type={type}
        placeholder={label}
      />
    </InputGroup>
  );
}

export default CustomInput;
