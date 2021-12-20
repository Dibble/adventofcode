namespace AdventOfCode20
{
    class Program
    {
        static void Main(string[] args)
        {
            using var sr = new StreamReader("input.txt");

            var file = sr.ReadToEnd();
            var lines = file.Split("\n").ToList();

            // surrounding pixels start dark
            // manually check around perimeter
            // infinite dark surrounding pixels become light if enhancement[0] == '#'
            // infinite light surrounding pixels become dark if enhancement[^0] == '.'
            // may switch every step

            var enhancementAlgorithm = lines[0].ToCharArray().Select(c => c == '#').ToArray();

            var inputGrid = lines.Skip(2).Select(l => l.ToCharArray().Select(c => c == '#').ToArray()).ToArray();

            var infinitePixelsLight = false;

            var enhancements = 0;
            while (enhancements < 50)
            {
                var outputGrid = new bool[inputGrid.Length + 2][];
                for (int i = 0; i < outputGrid.Length; i++)
                {
                    if (outputGrid[i] == null)
                    {
                        outputGrid[i] = new bool[inputGrid[0].Length + 2];
                    }
                    for (int j = 0; j < outputGrid[i].Length; j++)
                    {
                        var enhanced = GetAdjacentValues(inputGrid, i-1, j-1, infinitePixelsLight);
                        var index = Convert.ToInt32(enhanced.Aggregate(string.Empty, (acc, next) => next ? acc + "1" : acc + "0"), 2);
                        outputGrid[i][j] = enhancementAlgorithm[index];
                    }
                }

                enhancements++;
                if (infinitePixelsLight)
                {
                    infinitePixelsLight = enhancementAlgorithm[^1];
                }
                else
                {
                    infinitePixelsLight = enhancementAlgorithm[0];
                }
                inputGrid = outputGrid;
            }

            var litPixels = inputGrid.Aggregate(0, (acc, next) => acc + next.Aggregate(0, (lAcc, lNext) => lAcc + (lNext ? 1 : 0)));
            Console.WriteLine(litPixels);
        }

        static void PrintGrid (bool[][] input)
        {
            var printable = string.Join('\n', input.Select(r => string.Join(string.Empty, r.Select(p => p ? '#' : '.'))));
            Console.WriteLine(printable);
        }

        static List<bool> GetAdjacentValues (bool[][] input, int x, int y, bool defaultValue)
        {
            var adjacentPoints = new List<bool>();

            for (int i = x - 1; i <= x + 1; i++)
            {
                for (int j = y - 1; j <= y + 1; j++)
                {
                    if (i < 0 || i >= input.Length || j < 0 || j >= input[0].Length)
                    {
                        adjacentPoints.Add(defaultValue);
                    }
                    else
                    {
                        adjacentPoints.Add(input[i][j]);
                    }
                }
            }

            return adjacentPoints;
        }
    }
}