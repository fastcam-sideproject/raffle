// export default function Input({
//   type,
//   label,
//   value,
//   onChange,
//   name,
//   placeholder,
//   required,
//   width,
//   fontSize,
//   register,
//   errors,
//   color,
// }: InputType) {
//   const widthClass = `w-${width}`;
//   const fontSizeClass = `text-${fontSize}`;
//   const errorId = `${name}-error`;
//   const colorClass = `text-${color}`;

//   return (
//     <div className={`mb-4 ${widthClass}`}>
//       <label className={`font-bold ${fontSizeClass}`} htmlFor={name}>
//         {label}
//       </label>
//       <input
//         type={type}
//         id={name}
//         name={name}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         required={required}
//         {...register}
//         aria-invalid={errors ? 'true' : 'false'}
//         aria-describedby={errors ? errorId : undefined}
//         className={`border rounded w-full py-2 px-2 focus:outline-none focus:border-red-600
//           ${fontSizeClass} ${errors ? 'border-red-500' : ''}`}
//       />
//       {errors && (
//         <p id={errorId} className="text-xs text-red-500">
//           {errors.message}
//         </p>
//       )}
//     </div>
//   );
// }
