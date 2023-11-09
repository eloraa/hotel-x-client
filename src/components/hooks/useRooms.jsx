import { useQueryClient } from '@tanstack/react-query';

export const useRooms = () => useQueryClient().getQueryData(['rooms']);
