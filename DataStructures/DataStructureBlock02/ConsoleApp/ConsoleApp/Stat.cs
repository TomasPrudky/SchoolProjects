using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp
{
    public class Stat
    {
        public int CountOfTransfers { get; set; }
        public DataBlock Data { get; set; }

        public Stat(int countOfTransfers, DataBlock data)
        {
            CountOfTransfers = countOfTransfers;
            Data = data;
        }
    }
}
