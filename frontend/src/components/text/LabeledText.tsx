import { LabelElement } from "./Label";
import { TextElement } from "./Text";

interface TextProps {
    label: string;
    text: string | number;
  }
  
  export const LabeledText = ({ 
    label,
    text,
  }: TextProps) => {
    
    return (
      <div className='flex gap-2'>
        <LabelElement>{label}</LabelElement>
        <TextElement>{text} </TextElement>
      </div>
    );
  };