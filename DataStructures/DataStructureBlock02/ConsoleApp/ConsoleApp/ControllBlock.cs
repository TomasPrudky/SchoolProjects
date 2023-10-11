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
        public int SizeOfControllBlock { get; set; }
        public int SizeOfDatablock { get; set; }
        public int CountOfDatablocks { get; set; }
        public int CountOfRecorsInDatablock { get; set; }

        public ControllBlock(int sizeOfControllBlock, int sizeOfDatablock, int countOfDatablocks, int countOfRecorsInDatablock)
        {
            SizeOfControllBlock = sizeOfControllBlock;
            SizeOfDatablock = sizeOfDatablock;
            CountOfDatablocks = countOfDatablocks;
            CountOfRecorsInDatablock = countOfRecorsInDatablock;
        }

        public override string ToString()
        {
            return $"SizeOfControllBlock: {SizeOfControllBlock}, SizeOfDatablock: {SizeOfDatablock}, CountOfDatablocks: {CountOfDatablocks}, CountOfRecorsInDatablock: {CountOfRecorsInDatablock}, ";
        }
    }
}
