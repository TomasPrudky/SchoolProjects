namespace ConsoleApp1
{
    public class PairNodes
    {
        public string InEdge { get; set; }
        public string OutEdge { get; set; }
        public int BusyLength { get; set; }

        public PairNodes(string inEdge, string outEdge)
        {
            InEdge = inEdge;
            OutEdge = outEdge;
            BusyLength = 0;
        }
    }
}
