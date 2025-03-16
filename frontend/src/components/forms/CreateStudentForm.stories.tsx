import type { Meta, StoryObj } from '@storybook/react';

import CreateStudentForm from './CreateStudentForm';

const meta = {
  component: CreateStudentForm,
} satisfies Meta<typeof CreateStudentForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    classId: 0,
    //onSuccess: () => void
  }
};