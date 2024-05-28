
export default function InputField({
  type,
  name,
  onChange,
  placeholder,
  className = '',
  ...rest
}) {




  return (
    <input
      type={type}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      className={`px-2 py-2 rounded-lg w-full bg-gray-200 focus:outline-none my-1 mx-1 ${className}`}
      {...rest}
    />
  );
}