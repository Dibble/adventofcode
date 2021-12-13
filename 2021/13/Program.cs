namespace AdventOfCode13
{
    class Program
    {
        static void Main(string[] args)
        {
            using var sr = new StreamReader("input.txt");

            var file = sr.ReadToEnd();
            var lines = file.Split("\n").ToList();

            var dots = new List<(int, int)>();
            var folds = new List<(string, int)>();

            lines.ForEach(line =>
            {
                if (string.IsNullOrWhiteSpace(line))
                {
                    return;
                }

                if (line.StartsWith("fold along"))
                {
                    var s = line.Split(' ');
                    var fold = s[2];
                    var f = fold.Split('=');
                    var axis = f[0];
                    var position = int.Parse(f[1]);

                    folds.Add((axis, position));
                    return;
                }

                var split = line.Split(',');
                var x = int.Parse(split[0]);
                var y = int.Parse(split[1]);

                dots.Add((x, y));
            });

            var maxX = dots.Aggregate(0, (acc, next) => Math.Max(acc, next.Item1));
            var maxY = dots.Aggregate(0, (acc, next) => Math.Max(acc, next.Item2));

            var paper = new bool[maxX + 1][];
            for (int i = 0; i < paper.Length; i++)
            {
                paper[i] = new bool[maxY + 1];
            }

            dots.ForEach(dot =>
            {
                paper[dot.Item1][dot.Item2] = true;
            });

            // var firstFold = folds[0];
            folds.ForEach(fold =>
            {
                if (fold.Item1 == "y") // horizontal fold
                {
                    for (int i = 0; i < paper.Length; i++)
                    {
                        var rowToFold = paper[i];
                        for (int j = fold.Item2 - 1; j >= 0; j--)
                        {
                            var foldJ = fold.Item2 + (fold.Item2 - j);
                            if (foldJ < paper[i].Length)
                            {
                                paper[i][j] = paper[i][j] || paper[i][foldJ];
                            }
                        }

                        paper[i] = paper[i][0..fold.Item2];
                    }
                }
                else // vertical fold
                {
                    for (int i = fold.Item2 - 1; i >= 0 ; i--)
                    {
                        var foldI = fold.Item2 + (fold.Item2 - i);
                        if (foldI < paper.Length)
                        {
                            for (int j = 0; j < paper[i].Length; j++)
                            {
                                paper[i][j] = paper[i][j] || paper[foldI][j];
                            }
                        }
                    }

                    paper = paper[0..fold.Item2];
                }
            });

            // var visibleDots = paper.Aggregate(0, (acc, next) => acc + next.Aggregate(0, (cAcc, cNext) => cNext ? cAcc + 1 : cAcc));
            // Console.WriteLine(visibleDots);

            for (int i = 0; i < paper[0].Length; i++)
            {
                Console.WriteLine(string.Join(string.Empty, paper.Select(p => p[i] ? "#" : ".")));
            }
        }
    }
}