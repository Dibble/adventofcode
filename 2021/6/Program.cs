namespace AdventOfCode6
{
    class Program
    {
        const int Days = 18;

        static void Main(string[] args)
        {
            using var sr = new StreamReader("test.txt");

            var file = sr.ReadToEnd();
            var line = file.Split("\n")[0];

            var fishies = line.Split(',').Select(f => int.Parse(f)).ToArray();

            // var fishies = initialFish.Select(f => new Fish(f)).ToList();

            // for (int i = 0; i < Days; i++)
            // {
            //     fishies.ForEach(f => f.Age());
            //     var parents = fishies.Where(f => f.DidSpawn());
            //     var newParents = parents.Count();
                
            //     for (int j = 0; j < newParents; j++)
            //     {
            //         fishies.Add(new Fish(8));
            //     }
            // }

            // Console.WriteLine(fishies.Count);


            /*
            * WIP
            */
            var spawnsPerDay = new Dictionary<int, int>();

            for (int i = Days; i >=0; i--)
            {
                if (Days - i < 9)
                {
                    spawnsPerDay[i] = 0;
                    continue;
                }

                var nextSpawn = i + 9;
                var otherSpawns = new List<int>();
                for (int j = nextSpawn + 7; j <= Days; j+=7)
                {
                    otherSpawns.Add(j);
                }

                var spawnsForToday = spawnsPerDay[nextSpawn] + otherSpawns.Count + otherSpawns.Select(s => spawnsPerDay[s]).Sum() + 1;
                spawnsPerDay[i] = spawnsForToday;
            }

            var total = fishies.Length + fishies.Select(f => spawnsPerDay[f + 1]).Sum();
            Console.WriteLine(total);
        }
    }

    // class Fish
    // {
    //     private int state;
    //     private bool firstCycle;

    //     public Fish(int initialState)
    //     {
    //         state = initialState;
    //         firstCycle = initialState == 8;
    //     }

    //     public void Age ()
    //     {
    //         state--;
    //         if (state < 0)
    //         {
    //             state = 6;
    //             firstCycle = false;
    //         }
    //     }

    //     public bool DidSpawn ()
    //     {
    //         return !firstCycle && state == 6;
    //     }
    // }
}