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
