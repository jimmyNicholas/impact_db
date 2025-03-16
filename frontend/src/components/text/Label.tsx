interface TextProps {
    children?: React.ReactNode;
    text?: string;
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
    preset?: 'default';
    color?: 'primary' | 'secondary' | 'error';
    weight?: 'normal' | 'bold' | 'light';
    className?: string;
  }
  
  type ColorOption = 'primary' | 'secondary' | 'error';
  type WeightOption = 'normal' | 'bold' | 'light';
  
  export const LabelElement = ({ 
    children,
    text,
    variant,
    preset = 'default',
    color,
    weight,
    className = '',
  }: TextProps) => {
    const presetConfig = {
      default: {
        variant: 'h1' as const,
        color: 'primary' as ColorOption,
        weight: 'bold' as WeightOption,
      },
    };
  
    const config = presetConfig[preset];
    const finalVariant = variant || config.variant;
    const finalColor = color || config.color;
    const finalWeight = weight || config.weight;
  
    const Element = finalVariant;
    
    const colorClasses = {
      primary: 'text-gray-900',
      secondary: 'text-gray-600',
      error: 'text-red-500'
    };
    
    const weightClasses = {
      normal: 'font-normal',
      bold: 'font-bold',
      light: 'font-light'
    };
    
    const classes = `${colorClasses[finalColor]} ${weightClasses[finalWeight]} ${className}`;
    
    return (
      <Element className={classes}>
        {text || children}
      </Element>
    );
  };