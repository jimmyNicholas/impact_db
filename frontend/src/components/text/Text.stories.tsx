import type { Meta, StoryObj } from '@storybook/react';

import { TextElement } from './Text';

const meta = {
  component: TextElement,
  argTypes: {
    preset: {
      control: 'select',
      options: ['default', 'title', 'label', 'body', 'caption'],
    },
  },
} satisfies Meta<typeof TextElement>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "text"
  }
};

export const Label: Story = {
  args: {
    text: "",
    variant: "h1",
    color: "primary",
    weight: "bold",
    className: ""
  }
};