namespace AdventOfCode5
{
    class VentLine
    {
        public (int, int) Start;
        public (int, int) End;

        public VentLine(string start, string end)
        {
            var startComponents = start.Split(',');
            var endComponents = end.Split(',');

            Start = (int.Parse(startComponents[0]), int.Parse(startComponents[1]));
            End = (int.Parse(endComponents[0]), int.Parse(endComponents[1]));
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            using var sr = new StreamReader("input.txt");

            var file = sr.ReadToEnd();
            var lines = file.Split("\n");

            var maxX = 0;
            var maxY = 0;

            var ventLines = new List<VentLine>();

            for (int i = 0; i < lines.Length; i++)
            {
                var components = lines[i].Split(' ');
                var start = components[0];
                var end = components[2];

                var ventLine = new VentLine(start, end);
                ventLines.Add(ventLine);

                maxX = Math.Max(maxX, Math.Max(ventLine.Start.Item1, ventLine.End.Item1));
                maxY = Math.Max(maxY, Math.Max(ventLine.Start.Item2, ventLine.End.Item2));
            }

            var graph = new int[maxX + 1][];
            for (int i = 0; i < maxX + 1; i++)
            {
                graph[i] = Enumerable.Repeat(0, maxY + 1).ToArray();
            }

            ventLines.ForEach(ventLine =>
            {
                if (ventLine.Start.Item1 == ventLine.End.Item1) // vertical
                {
                    var x = ventLine.Start.Item1;
                    var start = Math.Min(ventLine.Start.Item2, ventLine.End.Item2);
                    var end = Math.Max(ventLine.Start.Item2, ventLine.End.Item2);

                    for (int i = start; i <= end; i++)
                    {
                        graph[x][i]++;
                    }
                }
                else if (ventLine.Start.Item2 == ventLine.End.Item2) // horizontal
                {
                    var y = ventLine.Start.Item2;
                    var start = Math.Min(ventLine.Start.Item1, ventLine.End.Item1);
                    var end = Math.Max(ventLine.Start.Item1, ventLine.End.Item1);

                    for (int i = start; i <= end; i++)
                    {
                        graph[i][y]++;
                    }
                }
                else // diagonal
                {
                    var xDiff = ventLine.End.Item1 - ventLine.Start.Item1;
                    var yDiff = ventLine.End.Item2 - ventLine.Start.Item2;

                    var x = ventLine.Start.Item1;
                    var y = ventLine.Start.Item2;
                    while (x != ventLine.End.Item1)
                    {
                        graph[x][y]++;
                        x += xDiff / Math.Abs(xDiff);
                        y += yDiff / Math.Abs(yDiff);
                    }

                    graph[ventLine.End.Item1][ventLine.End.Item2]++;
                }
            });

            // for (int i = 0; i < graph.Length; i++)
            // {
            //     Console.WriteLine(string.Join(string.Empty, graph[i]));
            // }

            var greaterThan2 = graph.Aggregate(0, (acc, next) => acc + next.Aggregate(0, (cAcc, cNext) => cNext >= 2 ? cAcc + 1 : cAcc));
            Console.WriteLine(greaterThan2);
        }
    }
}