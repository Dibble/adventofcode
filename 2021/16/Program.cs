using System.Globalization;

namespace AdventOfCode16
{
    class Program
    {
        static string HexStringToBinary (char hex)
        {
            var num = int.Parse(hex.ToString(), NumberStyles.HexNumber);
            var bin = Convert.ToString(num, 2);
            while (bin.Length < 4)
            {
                bin = "0" + bin;
            }

            return bin;
        }

        static (int, IEnumerable<string>) ProcessNextPacket (IEnumerable<string> binary)
        {
            if (!binary.Any())
            {
                return (0, new List<string>());
            }

            var versionSum = 0;
            var step = "version";

            var digits = binary.First();
            var remaining = binary.Skip(1);

            char operatorLengthType = default;

            var processing = true;
            while (processing)
            {
                Console.Write($"{step}: ");
                switch (step)
                {
                    case "version":
                        var version = Convert.ToInt32(digits[0..3], 2);
                        versionSum += version;
                        step = "type";
                        Console.Write($"{version} {digits[0..3]}");
                        digits = digits[3..];
                        break;
                    case "type":
                        while (digits.Length < 3)
                        {
                            digits += remaining.First();
                            remaining = remaining.Skip(1);
                        }

                        var type = Convert.ToInt32(digits[0..3], 2);
                        step = type == 4 ? "literal" : "operator";
                        Console.Write($"{type} {digits[0..3]}");
                        digits = digits[3..];
                        break;
                    case "literal":
                        while (digits.Length < 5)
                        {
                            digits += remaining.First();
                            remaining = remaining.Skip(1);
                        }

                        var last = digits[0] == '0';
                        Console.Write($"{digits[0..5]} {last}");
                        if (last)
                        {
                            processing = false;
                        }
                        digits = digits[5..];
                        break;
                    case "operator":
                        switch (operatorLengthType)
                        {
                            case default(char):
                                while (digits.Length < 1)
                                {
                                    digits += remaining.First();
                                    remaining = remaining.Skip(1);
                                }
                                operatorLengthType = digits[0];
                                Console.Write(operatorLengthType.ToString());
                                break;
                            case '0':
                                while (digits.Length < 15)
                                {
                                    digits += remaining.First();
                                    remaining = remaining.Skip(1);
                                }
                                var length = Convert.ToInt32(digits[0..15], 2);
                                digits = digits[15..];
                                while(digits.Length < length)
                                {
                                    digits += remaining.First();
                                    remaining = remaining.Skip(1);
                                }

                                string bits = digits[0..length];
                                var subPacket = ProcessNextPacket(new List<string>{ bits });
                                versionSum += subPacket.Item1;
                                processing = false;
                                break;
                            case '1':
                                while (digits.Length < 11)
                                {
                                    digits += remaining.First();
                                    remaining = remaining.Skip(1);
                                }
                                var packets = Convert.ToInt32(digits[0..11], 2);
                                digits = digits[11..];

                                for (int i = 0; i < packets; i++)
                                {
                                    var result = ProcessNextPacket(new List<string> { digits }.Concat(remaining));
                                    versionSum += result.Item1;
                                    remaining = result.Item2;
                                    digits = string.Empty;
                                }

                                processing = false;
                                break;
                        }
                        break;
                }
                Console.WriteLine();
            }

            return (versionSum, remaining);
        }

        static void Main(string[] args)
        {
            using var sr = new StreamReader("test.txt");

            var file = sr.ReadToEnd();
            var lines = file.Split("\n").ToList();

            var input = lines[0];
            var binary = input.ToCharArray().Select(c => HexStringToBinary(c));
            Console.WriteLine(string.Join(' ', binary));

            var processed = ProcessNextPacket(binary);
            Console.WriteLine(processed.Item1);
        }
    }
}