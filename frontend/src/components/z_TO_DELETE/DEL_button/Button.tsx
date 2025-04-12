// import React, { Children } from "react";

// interface ButtonProps {
//     label?: string;
//     children?: React.ReactNode;
//     type?: "button" | "submit" | "reset";
//     variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info";
//     size?: "xs" | "sm" | "md" | "lg" | "xl";
//     disabled?: boolean;
//     isLoading?: boolean;
//     onClick?: () => void;
//     // Specific style props
//     backgroundColor?: string;
//     textColor?: string;
//     paddingX?: number; // horizontal padding in px
//     paddingY?: number; // vertical padding in px
//     borderRadius?: number; // in px
//     borderWidth?: number; // in px
//     borderColor?: string;
//     fontWeight?: "normal" | "medium" | "semibold" | "bold";
//     width?: "auto" | "full"; // full width or auto
//   }
  
//   export const Button = ({
//     label,
//     children,
//     type = "button",
//     variant = "primary",
//     size = "md",
//     disabled = false,
//     isLoading = false,
//     onClick,
//     backgroundColor,
//     textColor,
//     paddingX,
//     paddingY,
//     borderRadius,
//     borderWidth = 0,
//     borderColor,
//     fontWeight = "medium",
//     width = "auto"
//   }: ButtonProps) => {
//     // Preset variants
//     const variantStyles = {
//       primary: { bg: "bg-blue-500 hover:bg-blue-600", text: "text-white" },
//       secondary: { bg: "bg-gray-200 hover:bg-gray-300", text: "text-gray-800" },
//       success: { bg: "bg-green-500 hover:bg-green-600", text: "text-white" },
//       danger: { bg: "bg-red-500 hover:bg-red-600", text: "text-white" },
//       warning: { bg: "bg-yellow-500 hover:bg-yellow-600", text: "text-white" },
//       info: { bg: "bg-cyan-500 hover:bg-cyan-600", text: "text-white" }
//     };
    
//     // Preset sizes
//     const sizeStyles = {
//       xs: { text: "text-xs", padding: "px-2 py-1" },
//       sm: { text: "text-sm", padding: "px-3 py-1.5" },
//       md: { text: "text-base", padding: "px-4 py-2" },
//       lg: { text: "text-lg", padding: "px-6 py-2.5" },
//       xl: { text: "text-xl", padding: "px-8 py-3" }
//     };
    
//     // Font weight
//     const fontWeightClasses = {
//       normal: "font-normal",
//       medium: "font-medium",
//       semibold: "font-semibold",
//       bold: "font-bold"
//     };
    
//     // Width
//     const widthClasses = {
//       auto: "",
//       full: "w-full"
//     };
    
//     // Custom styles as inline styles
//     const customStyles: React.CSSProperties = {};
    
//     if (backgroundColor) {
//       customStyles.backgroundColor = backgroundColor;
//     }
    
//     if (textColor) {
//       customStyles.color = textColor;
//     }
    
//     if (paddingX !== undefined || paddingY !== undefined) {
//       customStyles.padding = `${paddingY || 0}px ${paddingX || 0}px`;
//     }
    
//     if (borderRadius !== undefined) {
//       customStyles.borderRadius = `${borderRadius}px`;
//     }
    
//     if (borderWidth > 0) {
//       customStyles.borderWidth = `${borderWidth}px`;
//       customStyles.borderStyle = 'solid';
//       customStyles.borderColor = borderColor || 'currentColor';
//     }
  
//     return (
//       <button
//         type={type}
//         className={`
//           ${!backgroundColor ? variantStyles[variant].bg : ''}
//           ${!textColor ? variantStyles[variant].text : ''}
//           ${!(paddingX !== undefined || paddingY !== undefined) ? sizeStyles[size].padding : ''}
//           ${!(borderRadius !== undefined) ? 'rounded-lg' : ''}
//           ${fontWeightClasses[fontWeight]}
//           ${widthClasses[width]}
//           transition-colors duration-200
//           disabled:opacity-50 disabled:cursor-not-allowed
//         `}
//         disabled={disabled || isLoading}
//         onClick={onClick}
//         style={customStyles}
//       >
//         {isLoading ? "Loading..." : label || children}
//       </button>
//     );
//   };