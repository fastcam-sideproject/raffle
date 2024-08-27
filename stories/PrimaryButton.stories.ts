import type { Meta, StoryObj } from '@storybook/react';
import Button from '../lib/common/Button';

const meta = {
  title: 'Sample/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: '버튼 텍스트',
      defaultValue: 'Button',
    },

    disabled: {
      control: { type: 'boolean' },
      description: '버튼 활성화 여부',
      defaultValue: 'Button',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: 'button',
    label: '버튼',
    width: 'auto',
    fontSize: 'base',
    backgroundColor: 'bg-primary',
    className: 'hover:bg-blue-500',
  },
};

export const Secondary: Story = {
  args: {
    type: 'button',
    label: '버튼',
    width: 'auto',
    fontSize: 'base',
    backgroundColor: 'bg-secondary',
    className: 'hover:bg-red-500',
  },
};
