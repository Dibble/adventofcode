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
            var medianPosition = crabs.Count / 2.0;
            double median;

            if (crabs.Count % 2 == 1)
            {
                median = (crabs[(int)Math.Floor(medianPosition)] + crabs[(int)Math.Ceiling(medianPosition)]) / 2;
            }
            else
            {
                median = crabs[(int)medianPosition];
            }
            Console.WriteLine(median);

            var fuel = crabs.Select(c => Math.Abs(c - median)).Sum();
            Console.WriteLine(fuel);
        }
    }
}