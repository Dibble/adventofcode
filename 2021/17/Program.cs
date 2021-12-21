namespace AdventOfCode17
{
    class Program
    {
        static void Main(string[] args)
        {
            using var sr = new StreamReader("input.txt");

            var file = sr.ReadToEnd();
            var lines = file.Split("\n").ToList();
            var line = lines[0];
            var s = line.Split(' ');
            
            var x = s[2][2..].Split("..").Select(x => x.EndsWith(',') ? x[..^1] : x).Select(x => int.Parse(x)).ToArray();
            var y = s[3][2..].Split("..").Select(x => x.EndsWith(',') ? x[..^1] : x).Select(x => int.Parse(x)).ToArray();

            // ignore x pos
            // work backwards on y
            var yVelocity = y[0];
            var yPos = y[0];
            var steps = 0;

            while (yVelocity < 0)
            {
                yPos -= yVelocity;
                yVelocity++;
                steps++;
            }

            // Console.WriteLine(yPos);

            var maxT = steps * 2;

            var xVelocities = new Dictionary<int, List<int>>();

            // for all initial x velocities up to end of target area
            for (int i = 1; i <= x[1]; i++)
            {
                // find range of T values where x is in target area (up to maxT)
                var pos = 0;
                var velocity = i;
                var entersTarget = -1;
                var exitsTarget = -1;
                for (int j = 0; j < maxT; j++)
                {
                    pos += velocity;
                    if (velocity != 0)
                    {
                        velocity = velocity < 0 ? velocity + 1 : velocity - 1;
                    }

                    if (pos >= x[0] && pos <= x[1] && entersTarget == -1)
                    {
                        entersTarget = j;
                    }
                    if (pos > x[1] && exitsTarget == -1)
                    {
                        exitsTarget = j;
                    }

                    if (velocity == 0 || pos > x[1])
                    {
                        break;
                    }
                }

                if (entersTarget > -1)
                {
                    var final = exitsTarget == -1 ? maxT + 1 : exitsTarget;
                    for (int j = entersTarget; j < final; j++)
                    {
                        if (xVelocities.ContainsKey(j))
                        {
                            xVelocities[j].Add(i);
                        }
                        else
                        {
                            xVelocities.Add(j, new List<int>{ i });
                        }
                    }
                }
            }

            var yVelocities = new Dictionary<int, List<int>>();
            //  for all initial y velocities up to end of target area
            for (int i = y[0]; i < Math.Abs(y[0]); i++)
            {
                // find range of T values where y is in target area (up to maxT)
                var pos = 0;
                var velocity = i;
                var entersTarget = -1;
                var exitsTarget = -1;
                for (int j = 0; j < maxT; j++)
                {
                    pos += velocity;
                    velocity--;

                    if (pos <= y[1] && pos >= y[0] && entersTarget == -1)
                    {
                        entersTarget = j;
                    }
                    if (pos < y[0] && exitsTarget == -1)
                    {
                        exitsTarget = j;
                    }

                    if (pos < y[0])
                    {
                        break;
                    }
                }

                if (entersTarget > -1)
                {
                    var final = exitsTarget == -1 ? maxT + 1 : exitsTarget;
                    for (int j = entersTarget; j < final; j++)
                    {
                        if (yVelocities.ContainsKey(j))
                        {
                            yVelocities[j].Add(i);
                        }
                        else
                        {
                            yVelocities.Add(j, new List<int>{ i });
                        }
                    }
                }
            }

            //  find all x,y pairs where T is equal
            var tOverlap = xVelocities.Keys.Where(x => yVelocities.ContainsKey(x)).ToList();
            var pairs = new List<(int, int)>();

            tOverlap.ForEach(t =>
            {
                var xVals = xVelocities[t];
                var yVals = yVelocities[t];

                for (int i = 0; i < xVals.Count; i++)
                {
                    for (int j = 0; j < yVals.Count; j++)
                    {
                        var pair = (xVals[i], yVals[j]);
                        //  de-dupe pairs
                        if (!pairs.Contains(pair))
                        {
                            pairs.Add(pair);
                        }
                    }
                }
            });

            Console.WriteLine(pairs.Count);
        }
    }
}