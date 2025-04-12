import type { Meta, StoryObj } from '@storybook/react';

import Submit from './Submit';

const meta = {
  component: Submit,
} satisfies Meta<typeof Submit>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "label"
  }
};