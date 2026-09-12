import { format } from 'date-fns';

export const formatCount = (value) =>
  value >= 1000 ? `${(value / 1000).toFixed(1)}k` : `${value}`;

export const formatDate = (isoDate) => format(new Date(isoDate), 'dd MMM yyyy');