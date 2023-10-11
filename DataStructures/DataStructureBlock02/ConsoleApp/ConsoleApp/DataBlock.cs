using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp
{
    [Serializable]
    public class DataBlock
    {
        public List<Record> Records { get; set; } = new List<Record>();
        public Record FirstRecord { get; set; }
        public Record LastRecord { get; set; }

    }
}
