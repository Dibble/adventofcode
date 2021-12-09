namespace AdventOfCode9
{
    class Program
    {
        static void Main(string[] args)
        {
            using var sr = new StreamReader("input.txt");

            var file = sr.ReadToEnd();
            var lines = file.Split("\n");

            var heightMap = new int[lines.Length][];
            for (int i = 0; i < lines.Length; i++)
            {
                heightMap[i] = lines[i].ToArray().Select(x => int.Parse(x.ToString())).ToArray();
            }

            var lowPoints = new List<(int, int)>();
            for (int i = 0; i < heightMap.Length; i++)
            {
                for (int j = 0; j < heightMap[i].Length; j++)
                {
                    var current = heightMap[i][j];

                    var up = i == 0 ? 10 : heightMap[i-1][j];
                    var left = j == 0 ? 10 : heightMap[i][j-1];
                    var down = i == heightMap.Length - 1 ? 10 : heightMap[i+1][j];
                    var right = j == heightMap[0].Length - 1 ? 10 : heightMap[i][j+1];

                    if (current < up &&
                        current < left &&
                        current < down &&
                        current < right)
                    {
                        lowPoints.Add((i, j));
                    }
                }
            }

            var basins = new List<int>();
            lowPoints.ForEach(l =>
            {
                var basinPoints = new List<(int, int)>
                {
                    l
                };

                var exploredFrom = -1;

                while (true)
                {
                    // get all basin points from exploredFrom
                    if (exploredFrom + 1 >= basinPoints.Count)
                    {
                        break;
                    }

                    var toExplore = basinPoints.GetRange(exploredFrom + 1, basinPoints.Count - exploredFrom - 1);
                    exploredFrom = basinPoints.Count - 1;

                    // for all unexplored points
                    toExplore.ForEach(e =>
                    {
                        // find all adjacent points lower than 9 not already in basin
                        var adjacentCoords = GetAdjacentCoords(e.Item1, e.Item2, heightMap.Length, heightMap[0].Length);
                        var inBasin = adjacentCoords.Where(c => heightMap[c.Item1][c.Item2] < 9);
                        var newToBasin = inBasin.Where(c => !basinPoints.Any(b => b.Item1 == c.Item1 && b.Item2 == c.Item2));

                        basinPoints.AddRange(newToBasin);
                    });
                }

                basins.Add(basinPoints.Count);
                Console.WriteLine(basinPoints.Count);
            });
            
            var result = basins.OrderByDescending(x => x).Take(3).Aggregate(1, (acc, next) => acc * next);
            Console.WriteLine(result);
        }

        static List<(int, int)> GetAdjacentCoords (int x, int y, int xSize, int ySize)
        {
            var adjacentPoints = new List<(int, int)>();

            if (x > 0)
            {
                adjacentPoints.Add((x - 1, y));
            }
            if (y > 0)
            {
                adjacentPoints.Add((x, y - 1));
            }
            if (x < xSize - 1)
            {
                adjacentPoints.Add((x + 1, y));
            }
            if (y < ySize - 1)
            {
                adjacentPoints.Add((x, y + 1));
            }

            return adjacentPoints;
        }
    }
}