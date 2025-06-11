import { dayjs } from 'element-plus'

export const formatTime = (time, formatStr = 'YYYY年MM月DD日') => dayjs(time).format(formatStr)