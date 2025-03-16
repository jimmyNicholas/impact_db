// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from './Button';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    fontWeight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
    },
    width: {
      control: 'radio',
      options: ['auto', 'full'],
    },
    backgroundColor: { control: 'color' },
    textColor: { control: 'color' },
    paddingX: { 
      control: { type: 'range', min: 0, max: 40, step: 2 },
    },
    paddingY: { 
      control: { type: 'range', min: 0, max: 20, step: 2 },
    },
    borderRadius: { 
      control: { type: 'range', min: 0, max: 24, step: 1 },
    },
    borderWidth: { 
      control: { type: 'range', min: 0, max: 8, step: 1 },
    },
    borderColor: { control: 'color' },
    disabled: { control: 'boolean' },
    isLoading: { control: 'boolean' },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Secondary Button',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    label: 'Success',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    label: 'Delete',
  },
};

export const CustomStyled: Story = {
  args: {
    label: 'Custom Button',
    backgroundColor: '#6D28D9',
    textColor: '#ffffff',
    paddingX: 20,
    paddingY: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#8B5CF6',
    fontWeight: 'bold',
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width Button',
    variant: 'primary',
    width: 'full',
  },
};

export const Submit: Story = {
  args: {
    label: "Submit",
    backgroundColor: "rgba(63, 186, 120, 1)",
    textColor: "#ffffff",
    paddingX: 20,
    paddingY: 2,
    borderRadius: 20,
    borderWidth: 0,
    borderColor: "#8B5CF6",
    fontWeight: "bold",
    type: "submit",
    size: "md",
    disabled: false,
    width: "full"
  }
};
