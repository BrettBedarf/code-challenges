function mergeRanges(meetings) {
  // Merge meetings ranges

  // create deep copy of input since sorting will mutate
  // and could cause undesired side effects
  let mtgCpy = JSON.parse(JSON.stringify(meetings));

  // sort by start times
  let sortedMeetings = mtgCpy.sort((a, b) => a.startTime - b.startTime);

  // initialize merged meetings array with the earliest meeting
  const mergedMeetings = [sortedMeetings[0]];

  // start with next meeting
  for (let i = 1; i < sortedMeetings.length; i++) {
    const currentMeetings = sortedMeetings[i];
    const { startTime: curStart, endTime: curEnd } = currentMeetings;
    // will always be comparing with the latest merged block
    const lastMeeting = mergedMeetings[mergedMeetings.length - 1];
    let { startTime: lastStart, endTime: lastEnd } = lastMeeting;

    // we know current start time will always be greater or equal to the last merged
    // check if current meeting starts within last merged run time
    if (curStart <= lastEnd) {
      // will possbily extend last merged meeting end time
      // set last merged meeting's end time to whichever is greater
      if (curEnd > lastEnd) lastMeeting.endTime = curEnd;
    } else {
      // current meeting starts after last meeting ends and
      // need to add as the next merged meeting block
      mergedMeetings.push(sortedMeetings[i]);
    }
  }

  return mergedMeetings;
}
