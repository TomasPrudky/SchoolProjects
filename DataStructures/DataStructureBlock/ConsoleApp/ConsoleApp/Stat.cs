using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp
{
    public class Stat
    {
        public Record Block { get; set; }
        public int CountOfTransfers { get; set; }

        public Stat(Record block, int countOfTransfers)
        {
            Block = block;
            CountOfTransfers = countOfTransfers;
        }
    }
}
