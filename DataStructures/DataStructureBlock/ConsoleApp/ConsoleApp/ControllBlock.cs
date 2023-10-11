using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp
{
    [Serializable]
    public class ControllBlock
    {
        public int CountDataBlocks { get; set; }
        public int SizeOfDataBlock { get; set; }
        public static int ControlBlockSize { get; set; }
        //public static int FirstDataBlockIndex { get; set; } = ControlBlockSize + 1;
    }
}
