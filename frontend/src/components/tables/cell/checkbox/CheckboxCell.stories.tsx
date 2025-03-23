import type { Meta, StoryObj } from '@storybook/react';
import { CheckboxCell } from './CheckboxCell';

const meta = {
  component: CheckboxCell,
} satisfies Meta<typeof CheckboxCell>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: true,
    onCheckedChange: () => {},
    ariaLabel: "default"
  }
};