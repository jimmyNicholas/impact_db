import type { Meta, StoryObj } from '@storybook/react';

import { Editable } from './Editable';
import { useState } from 'react';

const meta = {
  component: Editable,
  argTypes: {
    onSave: { 
      description: 'Function called when saving the edited value',
      action: 'saved'
    }
  },
} satisfies Meta<typeof Editable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSave: (value) => console.log('Saved:', value),
    children: null
  },
  render: (args) => {
    const [value, setValue] = useState('Click to edit');
    const [isEditing, setIsEditing] = useState(true);
    
    return (
      <Editable {...args}>
        {!isEditing ? (
          <Editable.Display 
            value={value}
            onClick={() => setIsEditing(true)} 
          />
        ) : (
          <>
            <Editable.Input 
              value={value} 
              onChange={(e) => setValue(e.target.value)} 
              onBlur={() => {
                args.onSave(value);
                setIsEditing(false);
              }} 
            />
            <Editable.Actions 
              onSave={() => {
                args.onSave(value);
                setIsEditing(false);
              }} 
              onCancel={() => setIsEditing(false)} 
            />
          </>
        )}
      </Editable>
    );
  }
};
