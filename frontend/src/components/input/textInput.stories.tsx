import type { Meta, StoryObj } from '@storybook/react';

import TextInput from './textInput';

const meta = {
  component: TextInput,
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "id",
    required: false
  }
};