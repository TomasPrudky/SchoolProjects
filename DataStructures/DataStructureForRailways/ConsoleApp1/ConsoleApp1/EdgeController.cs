using System.Collections.Generic;

namespace ConsoleApp1
{
    public class EdgeController
    {
        public List<Edge<string, Rail>> Edges { get; set; } = new();
        public int LengthLeft { get; set; }

    }
}
