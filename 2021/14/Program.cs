namespace AdventOfCode14
{
    class Program
    {
        static void Main(string[] args)
        {
            using var sr = new StreamReader("input.txt");

            var file = sr.ReadToEnd();
            var lines = file.Split("\n").ToList();

            var polymer = lines[0];

            var rules = lines.Skip(2).ToDictionary(x =>
            {
                var s = x.Split("->");
                return s[0].Trim();
            }, y =>
            {
                var s = y.Split("->");
                return s[^1].Trim();
            });

            var polymerComponents = new Dictionary<string, long>();
            for (int i = 0; i < polymer.Length; i++)
            {
                var component = polymer[i].ToString();
                if (polymerComponents.ContainsKey(component))
                {
                    polymerComponents[component]++;
                }
                else
                {
                    polymerComponents.Add(component, 1);
                }
            }

            var pairs = new Dictionary<string, long>();
            for (int i = 0; i < polymer.Length - 1; i++)
            {
                var pair = $"{polymer[i]}{polymer[i+1]}";
                if (pairs.ContainsKey(pair))
                {
                    pairs[pair]++;
                }
                else
                {
                    pairs.Add(pair, 1);
                }
            }
            
            var step = 0;
            while (step < 40)
            {
                step++;

                // var insertions = new List<(int, string)>();
                // for (int i = 0; i < polymer.Length - 1; i++)
                // {
                //     var pair = $"{polymer[i]}{polymer[i+1]}";
                //     if (rules.ContainsKey(pair))
                //     {
                //         insertions.Add((i + 1, rules[pair]));
                //     }
                // }

                // for (int i = 0; i < insertions.Count; i++)
                // {
                //     polymer = polymer.Insert(insertions[i].Item1, insertions[i].Item2);
                //     for (int j = i; j < insertions.Count; j++)
                //     {
                //         insertions[j] = (insertions[j].Item1 + 1, insertions[j].Item2);
                //     }
                // }

                // Console.WriteLine($"{step} {polymer.Length}");

                pairs.ToList().ForEach(pair =>
                {
                    if (rules.ContainsKey(pair.Key))
                    {
                        var newComponent = rules[pair.Key];
                        if (polymerComponents.ContainsKey(newComponent))
                        {
                            polymerComponents[newComponent] += pair.Value;
                        }
                        else
                        {
                            polymerComponents.Add(newComponent, pair.Value);
                        }

                        var newPair1 = $"{pair.Key[0]}{newComponent}";
                        var newPair2 = $"{newComponent}{pair.Key[1]}";

                        if (pairs.ContainsKey(newPair1))
                        {
                            pairs[newPair1] += pair.Value;
                        }
                        else
                        {
                            pairs.Add(newPair1, pair.Value);
                        }
                        
                        if (pairs.ContainsKey(newPair2))
                        {
                            pairs[newPair2] += pair.Value;
                        }
                        else
                        {
                            pairs.Add(newPair2, pair.Value);
                        }

                        pairs[pair.Key] -= pair.Value;
                    }
                });

                // Console.WriteLine(step);
            }

            // var occurances = rules.Values.Distinct().ToDictionary(x => x, y => polymer.Count(c => c.ToString() == y));

            // var result = occurances.Values.Max() - occurances.Values.Min();
            var max = polymerComponents.Max(x => x.Value);
            var min = polymerComponents.Min(x => x.Value);

            polymerComponents.ToList().ForEach(component => Console.WriteLine($"{component.Key}: {component.Value}"));
            Console.WriteLine(max - min);
        }
    }
}