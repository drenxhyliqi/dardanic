import type Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';

import { strings } from '../../i18n';

export type CreateKind = keyof typeof strings.create.options;

// The four things you can create, in the order they're shown.
type IconName = ComponentProps<typeof Ionicons>['name'];

export const CREATE_OPTIONS: { kind: CreateKind; icon: IconName }[] = [
  { kind: 'post', icon: 'images-outline' },
  { kind: 'build', icon: 'speedometer-outline' },
  { kind: 'meeting', icon: 'calendar-outline' },
  { kind: 'crew', icon: 'people-outline' },
];

export const isCreateKind = (value: string): value is CreateKind =>
  CREATE_OPTIONS.some((option) => option.kind === value);
