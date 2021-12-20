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

        static (long, IEnumerable<string>) ProcessNextPacket (IEnumerable<string> binary)
        {
            if (!binary.Any())
            {
                return (0, new List<string>());
            }

            // var versionSum = 0;
            var result = 0L;
            var literalValue = string.Empty;
            var step = "version";

            var digits = binary.First();
            var remaining = binary.Skip(1);

            char operatorLengthType = default;

            var processing = true;
            while (processing && remaining.Any())
            {
                switch (step)
                {
                    case "version":
                        while (digits.Length < 3)
                        {
                            digits += remaining.First();
                            remaining = remaining.Skip(1);
                        }
                        // var version = Convert.ToInt32(digits[0..3], 2);
                        // versionSum += version;
                        step = "type";

                        digits = digits[3..];
                        break;
                    case "type":
                        while (digits.Length < 3)
                        {
                            digits += remaining.First();
                            remaining = remaining.Skip(1);
                        }

                        var type = Convert.ToInt32(digits[0..3], 2);
                        step = type switch
                        {
                            0 => "sum",
                            1 => "product",
                            2 => "minimum",
                            3 => "maximum",
                            4 => "literal",
                            5 => "greater",
                            6 => "less",
                            7 => "equal",
                            _ => throw new Exception($"Unknown packet type {type}")
                        };

                        digits = digits[3..];
                        break;
                    case "literal":
                        while (digits.Length < 5)
                        {
                            digits += remaining.First();
                            remaining = remaining.Skip(1);
                        }

                        literalValue += digits[1..5];
                        var last = digits[0] == '0';
                        if (last)
                        {
                            result = Convert.ToInt64(literalValue, 2);
                            processing = false;
                        }
                        digits = digits[5..];
                        break;
                    case "sum":
                    case "product":
                    case "minimum":
                    case "maximum":
                    case "greater":
                    case "less":
                    case "equal":
                        var subPacketResults = new List<long>();
                        switch (operatorLengthType)
                        {
                            case default(char):
                                while (digits.Length < 1)
                                {
                                    digits += remaining.First();
                                    remaining = remaining.Skip(1);
                                }
                                operatorLengthType = digits[0];
                                digits = digits[1..];

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
                                digits = digits[length..];
                                var subPacketBits = new List<string>();
                                for (int i = 0; i < bits.Length; i+=4)
                                {
                                    var end = i+4 < bits.Length ? i+4 : ^0;
                                    subPacketBits.Add(bits[i..end]);
                                }
                                var subPacket = ProcessNextPacket(subPacketBits);
                                subPacketResults.Add(subPacket.Item1);

                                while (subPacket.Item2.Any())
                                {
                                    subPacket = ProcessNextPacket(subPacket.Item2);
                                    subPacketResults.Add(subPacket.Item1);
                                }

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
                                    var packetResult = ProcessNextPacket(new List<string> { digits }.Concat(remaining));
                                    subPacketResults.Add(packetResult.Item1);
                                    remaining = packetResult.Item2;
                                    digits = string.Empty;
                                }

                                processing = false;
                                break;
                        }

                        if (subPacketResults.Any())
                        {
                            switch (step)
                            {
                                case "sum":
                                    result = subPacketResults.Sum();
                                    break;
                                case "product":
                                    result = subPacketResults.Aggregate(1L, (acc, next) => acc * next);
                                    break;
                                case "minimum":
                                    result = subPacketResults.Min();
                                    break;
                                case "maximum":
                                    result = subPacketResults.Max();
                                    break;
                                case "greater":
                                    result = subPacketResults[0] > subPacketResults[1] ? 1 : 0;
                                    break;
                                case "less":
                                    result = subPacketResults[0] < subPacketResults[1] ? 1 : 0;
                                    break;
                                case "equal":
                                    result = subPacketResults[0] == subPacketResults[1] ? 1 : 0;
                                    break;
                            }
                        }
                        break;
                }
            }

            if (digits.Length > 0)
            {
                remaining = remaining.Prepend(digits);
            }
            return (result, remaining);
        }

        static void Main(string[] args)
        {
            using var sr = new StreamReader("input.txt");

            var file = sr.ReadToEnd();
            var lines = file.Split("\n").ToList();

            var input = lines[0];
            var binary = input.ToCharArray().Select(c => HexStringToBinary(c));
            // Console.WriteLine(string.Join(' ', binary));

            var processed = ProcessNextPacket(binary);
            Console.WriteLine(processed.Item1);
        }
    }
}