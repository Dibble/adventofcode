namespace AdventOfCode15
{
    class Program
    {
        struct Path
        {
            public List<Position> positions;
            public int risk;
            public Path (List<Position> _positions, int _risk)
            {
                positions = _positions;
                risk =_risk;
            }
        }

        struct Position : IEquatable<Position>
        {
            public readonly int x;
            public readonly int y;
            public Position(int _x, int _y)
            {
                x = _x;
                y = _y;
            }

            public override bool Equals(object? obj)
            {
                if (obj == null || GetType() != obj.GetType())
                {
                    return false;
                }
                var other = (Position)obj;
                
                return x == other.x && y == other.y;
            }

            public bool Equals(Position other)
            {
                return x == other.x && y == other.y;
            }

            public override int GetHashCode()
            {
                return $"{x},{y}".GetHashCode();
            }
        }

        static void Main(string[] args)
        {
            using var sr = new StreamReader("test2.txt");

            var file = sr.ReadToEnd();
            var lines = file.Split("\n").ToList();

            var grid = lines.Select(l => l.ToCharArray().Select(c => int.Parse(c.ToString())).ToArray()).ToArray();
            // TODO expand grid by 5

            var goal = new Position(grid.Length - 1, grid[0].Length - 1);

            var minsGrid = new Dictionary<Position, int>
            {
                { goal, 0 }
            };

            var changes = false;
            while (minsGrid.Count < grid.Length * grid[0].Length || changes)
            {
                Console.WriteLine($"{minsGrid.Count} {changes}");
                changes = false;

                for (int x = goal.x; x >= 0; x--)
                {
                    for (int y = goal.y; y >= 0; y--)
                    {
                        var adjacent = GetAdjacentCoords(x, y, goal.x + 1, goal.y + 1);
                        var routes = adjacent.Where(pos => minsGrid.ContainsKey(pos));
                        var min = routes.Select(pos => minsGrid[pos] + grid[pos.x][pos.y]).Min();

                        if (minsGrid.ContainsKey(new Position(x, y)))
                        {
                            var newMin = Math.Min(min, minsGrid[new Position(x, y)]);
                            if (newMin < minsGrid[new Position(x, y)])
                            {
                                minsGrid[new Position(x, y)] = newMin;
                                Console.WriteLine($"updating {x},{y} = {newMin} ({minsGrid[new Position(x, y)]})");
                                changes = true;
                            }
                        }
                        else
                        {
                            minsGrid.Add(new Position(x, y), min);
                            Console.WriteLine($"adding {x},{y} = {min}");
                            changes = true;
                        }
                    }
                }
            }

            Console.WriteLine(minsGrid[new Position(0, 0)]);
        }

        static List<Position> GetAdjacentCoords (int x, int y, int xSize, int ySize)
        {
            var adjacentPoints = new List<Position>();

            for (int i = x - 1; i <= x + 1; i++)
            {
                for (int j = y - 1; j <= y + 1; j++)
                {
                    if (i == x || j == y)
                    {
                        adjacentPoints.Add(new Position(i, j));
                    }
                }
            }

            return adjacentPoints.Where(p => p.x >= 0 && p.x < xSize && p.y >= 0 && p.y < ySize).ToList();
        }
    }
}