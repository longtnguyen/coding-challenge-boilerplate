export const TASK_STATUSES = Object.freeze({
  ToDo: 'To Do',
  InProgress: 'In Progress',
  Blocked: 'Blocked',
  InQA: 'In QA',
  Done: 'Done',
  Deployed: 'Deployed',
})

export const STATUS_OPTIONS: { [key: string]: string[] } = {
  [TASK_STATUSES.ToDo]: [TASK_STATUSES.ToDo, TASK_STATUSES.InProgress],
  [TASK_STATUSES.InProgress]: [
    TASK_STATUSES.InProgress,
    TASK_STATUSES.Blocked,
    TASK_STATUSES.InQA,
  ],
  [TASK_STATUSES.Blocked]: [TASK_STATUSES.Blocked, TASK_STATUSES.ToDo],
  [TASK_STATUSES.InQA]: [
    TASK_STATUSES.ToDo,
    TASK_STATUSES.InQA,
    TASK_STATUSES.Done,
  ],
  [TASK_STATUSES.Done]: [TASK_STATUSES.Done, TASK_STATUSES.Deployed],
  [TASK_STATUSES.Deployed]: [TASK_STATUSES.Deployed],
}

export const STATUS_COLORS: Record<
  (typeof TASK_STATUSES)[keyof typeof TASK_STATUSES],
  { bg: string; text: string }
> = {
  [TASK_STATUSES.ToDo]: { bg: '#DFE1E6', text: '#42526E' },
  [TASK_STATUSES.InProgress]: { bg: '#DEEBFF', text: '#0052CC' },
  [TASK_STATUSES.Blocked]: { bg: '#FFEBE6', text: '#DE350B' },
  [TASK_STATUSES.InQA]: { bg: '#E3FCEF', text: '#006644' },
  [TASK_STATUSES.Done]: { bg: '#E3FCEF', text: '#006644' },
  [TASK_STATUSES.Deployed]: { bg: '#F4F5F7', text: '#091E42' },
}
