namespace AdventOfCode6
{
    class Program
    {
        const int Days = 256;

        static void Main(string[] args)
        {
            using var sr = new StreamReader("input.txt");

            var file = sr.ReadToEnd();
            var line = file.Split("\n")[0];

            var fishies = line.Split(',').Select(f => int.Parse(f)).ToArray();
            // var fishies = new[] { 3 };
            // var realFishies = new List<Fish>{ new Fish(3) };

            // for (int i = 0; i < Days; i++)
            // {
            //     realFishies.ForEach(f => f.Age());
            //     var parents = realFishies.Where(f => f.DidSpawn());
            //     var newParents = parents.Count();
                
            //     for (int j = 0; j < newParents; j++)
            //     {
            //         realFishies.Add(new Fish(8));
            //     }
            // }

            // Console.WriteLine(realFishies.Count);

            // PART 2
            var spawnsPerDay = new Dictionary<int, double>();

            // for each day in reverse order
            for (int i = Days; i >=0; i--)
            {
                // any days too close to the end won't spawn other fish
                if (Days - i < 9)
                {
                    spawnsPerDay[i] = 0.0;
                    continue;
                }

                // first spawn happens 9 days later
                var nextSpawn = i + 9;

                // all other spawns happen at 7 day intervals after that
                var otherSpawns = new List<int>();
                for (int j = nextSpawn + 7; j <= Days; j+=7)
                {
                    otherSpawns.Add(j);
                }

                // all spawns for today
                var spawnsForToday = 1.0 + // next spawn
                    spawnsPerDay[nextSpawn] + // subsequent spawns from next
                    otherSpawns.Count + // all other spawns
                    otherSpawns.Select(s => spawnsPerDay[s]).Sum(); // subsequent spawns from others
                spawnsPerDay[i] = spawnsForToday;
            }

            var total = 0.0;
            for (int i = 0; i < fishies.Length; i++)
            {
                var fSpawns = new List<int>();
                for (int j = fishies[i] + 1; j <= Days; j+=7)
                {
                    fSpawns.Add(j);
                }

                try
                {
                    for (int s = 0; s < fSpawns.Count; s++)
                    {
                        var spawn = fSpawns[s];
                        var newSpawns = spawnsPerDay[spawn];
                        total += newSpawns;
                    }
                    // total += fSpawns.Count + fSpawns.Select(x => spawnsPerDay[x]).Sum();
                    total += fSpawns.Count;
                }
                catch
                {
                    Console.WriteLine($"caught exception {i} {fishies[i]} {fSpawns.Count} {string.Join(',', fSpawns)}");
                }
            }

            Console.WriteLine(total + fishies.Length);
        }
    }

    class Fish
    {
        private int state;
        private bool firstCycle;

        public Fish(int initialState)
        {
            state = initialState;
            firstCycle = initialState == 8;
        }

        public void Age ()
        {
            state--;
            if (state < 0)
            {
                state = 6;
                firstCycle = false;
            }
        }

        public bool DidSpawn ()
        {
            return !firstCycle && state == 6;
        }
    }
}