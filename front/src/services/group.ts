import {VkGroup} from '@/entities/vk/types';

export const getVkGroups = async (
    userId: number,
) => {
    const res: {groups: VkGroup[]} = await fetch(
        `/group?userId=${userId}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        },
    ).then(res => res.json());

    return res.groups;
};
