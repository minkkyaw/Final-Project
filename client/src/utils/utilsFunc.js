const getDuration = input => {
  let timeDiff = Math.round(
    (new Date(Date.now()) - new Date(input)) / 1000 / 60
  );
  console.log(timeDiff === 1);

  return timeDiff < 1
    ? `${timeDiff * 60} seconds ago`
    : timeDiff === 1
    ? `1 min ago`
    : timeDiff < 60
    ? `${timeDiff} mins ago`
    : timeDiff < 90
    ? `1 hour ago`
    : timeDiff <= 60 * 24
    ? `${Math.round(timeDiff / 60)} hours ago`
    : timeDiff <= 60 * 24 * 1.5
    ? `1 day ago`
    : `${Math.round.round(timeDiff / 60 / 24)} days ago `;
};

export default { getDuration };
