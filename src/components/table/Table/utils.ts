export const handleHours = (hours: number): string => { // Handle hours worked
  if(hours > 72) {
    return "72+"
  } else return hours.toString()
}

export const setProgressBar = (hours: number): string => { // Set step up hrs progress bar color
  if(hours > 72) { // >72 hrs
    return 'progress-success'
  }

  if(hours === 72) { // Exactly 72 hours
    return 'bg-success/30'
  }

  return 'progress-warning bg-warning/20'
}