namespace AdventOfCode2
{
    class Program
    {
        static void Main(string[] args)
        {
            using var sr = new StreamReader("input.txt");

            var x = 0;
            var depth = 0;
            var aim = 0;

            while (sr.Peek() >= 0)
            {
                var line = sr.ReadLine();
                if (line == null)
                {
                    break;
                }

                var splits = line.Split(' ');
                var instruction = splits[0];
                var value = int.Parse(splits[1]);

                switch (instruction)
                {
                    case "forward":
                        x += value;
                        depth += aim * value;
                        break;
                    case "up":
                        aim -= value;
                        break;
                    case "down":
                        aim += value;
                        break;
                }
            }

            Console.WriteLine(x);
            Console.WriteLine(depth);
            Console.WriteLine(x * depth);
        }
    }
}