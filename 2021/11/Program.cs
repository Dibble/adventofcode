namespace AdventOfCode10
{
    class Program
    {
        static void Main(string[] args)
        {
            using var sr = new StreamReader("input.txt");

            var file = sr.ReadToEnd();
            var lines = file.Split("\n").ToList();

            var grid = lines.Select(l => l.ToCharArray().Select(c => int.Parse(c.ToString())).ToArray()).ToArray();

            var flashes = 0;

            var step = 0;
            while (true)
            {
                for (int i = 0; i < grid.Length; i++)
                {
                    for (int j = 0; j < grid[0].Length; j++)
                    {
                        grid[i][j]++;
                    }
                }

                while (grid.Any(r => r.Any(octopus => octopus > 9)))
                {
                    var nextFlashI = Array.FindIndex(grid, row => row.Any(octopus => octopus > 9));
                    var nextFlashJ = Array.FindIndex(grid[nextFlashI], octopus => octopus > 9);

                    grid[nextFlashI][nextFlashJ] = -1;
                    flashes++;

                    var adjacentCoords = GetAdjacentCoords(nextFlashI, nextFlashJ, grid.Length, grid[0].Length);
                    adjacentCoords.ForEach(coords =>
                    {
                        if (grid[coords.Item1][coords.Item2] > -1)
                        {
                            grid[coords.Item1][coords.Item2]++;
                        }
                    });
                }

                if (grid.All(row => row.All(octopus => octopus == -1)))
                {
                    break;
                }

                for (int i = 0; i < grid.Length; i++)
                {
                    for (int j = 0; j < grid[i].Length; j++)
                    {
                        grid[i][j] = Math.Max(grid[i][j], 0);
                    }
                }

                step++;
            }

            Console.WriteLine(step + 1);
        }

        static List<(int, int)> GetAdjacentCoords (int x, int y, int xSize, int ySize)
        {
            var adjacentPoints = new List<(int, int)>();

            for (int i = x - 1; i <= x + 1; i++)
            {
                for (int j = y - 1; j <= y + 1; j++)
                {
                    adjacentPoints.Add((i, j));
                }
            }

            return adjacentPoints.Where(p => p.Item1 >= 0 && p.Item1 < xSize && p.Item2 >= 0 && p.Item2 < ySize).ToList();
        }
    }
}