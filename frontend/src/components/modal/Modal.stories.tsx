import type { Meta, StoryObj } from '@storybook/react';

import { Modal } from './Modal';

const meta = {
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Modal Button',
    buttonType: 'success',
    buttonStyle: '',
    ModalBoxChild: <div>Modal Box</div>,
    modalId: "modalId"
  }
};