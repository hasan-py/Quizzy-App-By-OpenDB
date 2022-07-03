import { InputGroup, InputLeftAddon, Input } from "@chakra-ui/react";

interface CustomInputInterface {
  name: string;
  label: string;
  type?: string;
  onChange: Function;
  value: string | number | undefined;
}

function CustomInput({
  type,
  name,
  label,
  onChange,
  value,
}: CustomInputInterface) {
  return (
    <InputGroup mb={4}>
      <InputLeftAddon children={label} />
      <Input
        value={value}
        onChange={(e: any) => onChange(e)}
        name={name}
        type={type}
        placeholder={label}
      />
    </InputGroup>
  );
}

export default CustomInput;
