namespace AdventOfCode12
{
    class Program
    {
        static void Main(string[] args)
        {
            using var sr = new StreamReader("input.txt");

            var file = sr.ReadToEnd();
            var lines = file.Split("\n").ToList();

            var links = new Dictionary<string, List<string>>();

            lines.ForEach(line =>
            {
                var s = line.Split('-');
                var start = s[0];
                var end = s[1];

                if (!links.ContainsKey(start))
                {
                    links.Add(start, new List<string> { end });
                }
                else
                {
                    links[start].Add(end);
                }

                if (!links.ContainsKey(end))
                {
                    links.Add(end, new List<string> { start });
                }
                else
                {
                    links[end].Add(start);
                }
            });

            var paths = new List<List<string>>();
            links["start"].ForEach(l =>
            {
                paths.Add(new List<string>{ "start", l });
            });

            while (paths.Any(p => p.Last() != "end" && p.Last() != "dead"))
            {
                for (int i = 0; i < paths.Count; i++)
                {
                    var path = paths[i];
                    if (path.Last() == "end" || path.Last() == "dead")
                    {
                        continue;
                    }

                    var nextCaves = links[path.Last()].Where(cave => cave.ToCharArray().All(c => char.IsUpper(c)) || !path.Contains(cave)).ToList();
                    // TODO prevent infinite loops between big caves

                    if (nextCaves.Count > 1)
                    {
                        nextCaves.Skip(1).ToList().ForEach(cave =>
                        {
                            var newPath = new List<string>(path)
                            {
                                cave
                            };

                            paths.Add(newPath);
                        });
                    }

                    if (nextCaves.Count > 0)
                    {
                        path.Add(nextCaves.First());
                    }
                    else
                    {
                        path.Add("dead");
                    }
                }
            }

            Console.WriteLine(paths.Where(path => !path.Contains("dead")).Count());
        }
    }
}