namespace AdventOfCode22
{
    class Program
    {
        static void Main(string[] args)
        {
            using var sr = new StreamReader("test3.txt");

            var file = sr.ReadToEnd();
            var lines = file.Split("\n").ToList();

            var xMin = 0;
            var xMax = 0;
            var yMin = 0;
            var yMax = 0;
            var zMin = 0;
            var zMax = 0;
            lines.ForEach(line =>
            {
                var a = line.Split(" ");
                var command = a[0];
                var b = a[1].Split(',');

                var x = b[0][2..];
                var xSplit = x.Split("..");
                var xStart = int.Parse(xSplit[0]);
                var xEnd = int.Parse(xSplit[1]);

                xMin = Math.Min(xMin, xStart);
                xMax = Math.Max(xMax, xEnd);
                
                var y = b[1][2..];
                var ySplit = y.Split("..");
                var yStart = int.Parse(ySplit[0]);
                var yEnd = int.Parse(ySplit[1]);

                yMin = Math.Min(yMin, yStart);
                yMax = Math.Max(yMax, yEnd);
                
                var z = b[2][2..];
                var zSplit = z.Split("..");
                var zStart = int.Parse(zSplit[0]);
                var zEnd = int.Parse(zSplit[1]);

                zMin = Math.Min(zMin, zStart);
                zMax = Math.Max(zMax, zEnd);
            });
            Console.WriteLine($"{xMin}..{xMax} {yMin}..{yMax} {zMin}..{zMax}");

            var cubes = new bool[xMax - xMin][][];
            
            lines.ForEach(line =>
            {
                var a = line.Split(" ");
                var command = a[0];
                var b = a[1].Split(',');

                var x = b[0][2..];
                var xSplit = x.Split("..");
                var xStart = int.Parse(xSplit[0]);
                var xEnd = int.Parse(xSplit[1]);
                
                var y = b[1][2..];
                var ySplit = y.Split("..");
                var yStart = int.Parse(ySplit[0]);
                var yEnd = int.Parse(ySplit[1]);
                
                var z = b[2][2..];
                var zSplit = z.Split("..");
                var zStart = int.Parse(zSplit[0]);
                var zEnd = int.Parse(zSplit[1]);

                Console.WriteLine($"{command} {xStart}..{xEnd} {yStart}..{yEnd} {zStart}..{zEnd}");
                for (int i = xStart; i <= xEnd; i++)
                {
                    var ci = i + (xMin * -1);
                    // Console.WriteLine(ci);
                    if (cubes[ci] == default)
                    {
                        cubes[ci] = new bool[yMax - yMin][];
                    }

                    for (int j = yStart; j <= yEnd; j++)
                    {
                        var cj = j + (yMin * -1);
                        // Console.WriteLine($"{cj} = {j} + ({yMin} * ");
                        if (cubes[ci][cj] == default)
                        {
                            cubes[ci][cj] = new bool[zMax - zMin];
                        }

                        for (int k = zStart; k <= zEnd; k++)
                        {
                            var ck = k + (zMin * -1);
                            cubes[ci][cj][ck] = command == "on";
                        }
                    }
                }
            });

            var total = cubes.Aggregate(0, (acc, next) =>
            {
                if (next == null) return acc;
                return acc + next.Aggregate(0, (aAcc, aNext) =>
                {
                    if (aNext == null) return aAcc;
                    return aAcc + aNext.Aggregate(0, (bAcc, bNext) =>
                    {
                        return bNext ? bAcc + 1 : bAcc;
                    });
                });
            });
            Console.WriteLine(total);
        }
    }
}