function canTwoMoviesFillFlight(movieLengths, flightLength) {
  // Determine if two movie runtimes add up to the flight length

  // use a set so we can have O(1) lookup later
  const seenMovies = new Set();

  // Instead of adding all movies to the set and checking for matches,
  // we can check against those already added first so we know it's not
  // a duplicate.
  // i.e. if movielengths = {1,2,3} and flightLength = 6
  // We don't want a false positive when looking for a second
  // movie with length 3

  for (let i = 0; i < movieLengths.length; i++) {
    const firstMovie = movieLengths[i];
    // skip if first length is at least as long as the flight
    if (firstMovie >= flightLength) continue;

    matchingSecondMovie = flightLength - firstMovie;
    // find if second movie length exists in already seen movie lengths
    if (seenMovies.has(matchingSecondMovie)) {
      return true;
    }

    seenMovies.add(firstMovie);
  }

  return false;
}

// Tests

let desc = 'short flight';
let actual = canTwoMoviesFillFlight([2, 4], 1);
let expected = false;
assertEquals(actual, expected, desc);

desc = 'long flight';
actual = canTwoMoviesFillFlight([2, 4], 6);
expected = true;
assertEquals(actual, expected, desc);

desc = 'one movie half flight length';
actual = canTwoMoviesFillFlight([3, 8], 6);
expected = false;
assertEquals(actual, expected, desc);

desc = 'two movies half flight length';
actual = canTwoMoviesFillFlight([3, 8, 3], 6);
expected = true;
assertEquals(actual, expected, desc);

desc = 'lots of possible pairs';
actual = canTwoMoviesFillFlight([1, 2, 3, 4, 5, 6], 7);
expected = true;
assertEquals(actual, expected, desc);

desc = 'not using first movie';
actual = canTwoMoviesFillFlight([4, 3, 2], 5);
expected = true;
assertEquals(actual, expected, desc);

desc = 'multiple movies shorter than flight';
actual = canTwoMoviesFillFlight([5, 6, 7, 8], 9);
expected = false;
assertEquals(actual, expected, desc);

desc = 'only one movie';
actual = canTwoMoviesFillFlight([6], 6);
expected = false;
assertEquals(actual, expected, desc);

desc = 'no movies';
actual = canTwoMoviesFillFlight([], 2);
expected = false;
assertEquals(actual, expected, desc);

function assertEquals(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`);
  }
}
