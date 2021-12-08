namespace AdventOfCode7
{
    class Program
    {
        static void Main(string[] args)
        {
            using var sr = new StreamReader("input.txt");

            var file = sr.ReadToEnd();
            var line = file.Split("\n")[0];

            var crabs = line.Split(',').Select(c => int.Parse(c)).ToList();

            crabs.Sort();
            // var medianPosition = crabs.Count / 2.0;
            // double median;

            // if (crabs.Count % 2 == 1)
            // {
            //     median = (crabs[(int)Math.Floor(medianPosition)] + crabs[(int)Math.Ceiling(medianPosition)]) / 2;
            // }
            // else
            // {
            //     median = crabs[(int)medianPosition];
            // }
            // Console.WriteLine(median);

            // var fuel = crabs.Select(c => Math.Abs(c - median)).Sum();
            // Console.WriteLine(fuel);

            var start = crabs.First();
            var end = crabs.Last();

            var minFuel = -1;

            for (int i = start; i <= end; i++)
            {
                // calculate fuel usage
                var currentFuel = 0;

                for (int j = 0; j < crabs.Count; j++)
                {
                    var crab = crabs[j];
                    currentFuel += Factorial(Math.Abs(crab - i));
                    if (currentFuel > minFuel && minFuel > -1)
                    {
                        break;
                    }
                }

                if (minFuel == -1)
                {
                    minFuel = currentFuel;
                }
                else
                {
                    minFuel = Math.Min(minFuel, currentFuel);
                }
            }

            Console.WriteLine(minFuel);
        }

        static int Factorial (int i)
        {
            var result = 0;
            while (i > 0)
            {
                result += i;
                i--;
            }

            return result;
        }
    }
}