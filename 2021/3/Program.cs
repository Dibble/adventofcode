namespace AdventOfCode3
{
    class Program
    {
        static void Main(string[] args)
        {
            using var sr = new StreamReader("input.txt");

            var diagnostics = new List<string>();

            while (sr.Peek() >= 0)
            {
                var line = sr.ReadLine();
                if (line == null)
                {
                    break;
                }

                diagnostics.Add(line);

            }
            
            var oxygen = diagnostics;
            var scrubber = diagnostics;
            for (int i = 0; i < oxygen[0].Length; i++)
            {
                if (oxygen.Count == 1)
                {
                    break;
                }

                var bits = oxygen.Select(o => o[i]);
                var zeros = bits.Where(b => b == '0');
                var ones = bits.Where(b => b == '1');

                oxygen = oxygen.Where(o => zeros.Count() > ones.Count() ? o[i] == '0' : o[i] == '1').ToList();
            }

            for (int i = 0; i < scrubber[0].Length; i++)
            {
                if (scrubber.Count == 1)
                {
                    break;
                }

                var bits = scrubber.Select(o => o[i]);
                var zeros = bits.Where(b => b == '0');
                var ones = bits.Where(b => b == '1');

                scrubber = scrubber.Where(o => zeros.Count() > ones.Count() ? o[i] == '1' : o[i] == '0').ToList();
            }

            var o = Convert.ToInt32(oxygen[0], 2);
            var s = Convert.ToInt32(scrubber[0], 2);

            Console.WriteLine($"{o} * {s} = {o * s}");
        }
    }
}