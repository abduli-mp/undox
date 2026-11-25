function levenshteinDistance(first, second) {
  const matrix = [];

  for (let i = 0; i <= second.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= first.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= second.length; i++) {
    for (let j = 1; j <= first.length; j++) {
      const cost = first[j - 1] === second[i - 1] ? 0 : 1;

      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // Deletion
        matrix[i][j - 1] + 1, // Insertion
        matrix[i - 1][j - 1] + cost, // Substitution
      );
    }
  }

  return matrix[second.length][first.length];
}

export function suggestCommand(input, commands, limit = 3) {
  const search = input.toLowerCase().trim();

  const results = commands
    .map((command) => ({
      command,
      distance: levenshteinDistance(search, command.toLowerCase()),
    }))
    .filter((result) => result.distance <= 2)
    .sort((a, b) => a.distance - b.distance);

  return results.slice(0, limit).map((result) => result.command);
}
